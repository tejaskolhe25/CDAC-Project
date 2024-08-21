
using Azure.Core;
using FashionFlareMVC.Models;
using FashionFlareMVC.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json.Nodes;

namespace FashionFlareMVC.Controllers
{
    [Authorize]
    public class CheckoutController : Controller
    {
        private string PaypalClientId { get; set; }
        private string PaypalSecret { get; set; }
        private string PaypalUrl { get; set; }

        private readonly decimal shippingFee;
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> userManager;

        public CheckoutController(IConfiguration configuration,ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            PaypalClientId = configuration["PaypalSettings:ClientId"]!;
            PaypalSecret = configuration["PaypalSettings:Secret"]!;
            PaypalUrl = configuration["PaypalSettings:Url"]!;

            shippingFee = configuration.GetValue<decimal>("CartSettings:ShippingFee");
            this.context = context;
            this.userManager = userManager;
        }

        public IActionResult Index()
        {
            List<OrderItem> cartItems = CartHelper.GetCartItems(Request, Response, context);
            decimal total= CartHelper.GetSubtotal(cartItems)+shippingFee;
            string deliveryAddress = TempData["DeliveryAddress"] as string ?? "";
            TempData.Keep();
            ViewBag.DeliveryAddress = deliveryAddress;
            ViewBag.Total = total;
            ViewBag.PaypalClientId = PaypalClientId;
            return View();
        }

        private async Task<string> GetPaypalAccessToken()
        {
            string accessToken = "";
            string url = PaypalUrl + "/v2/oauth2/token";

            using (var client = new HttpClient())
            {
                string credentials64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(PaypalClientId + ":" + PaypalSecret));
                client.DefaultRequestHeaders.Add("Authorization", "Basic " + credentials64);
                var requestMessage = new HttpRequestMessage(HttpMethod.Post, url);
                requestMessage.Content = new StringContent("grant_type=client_credentials", null, "application/x-www-form-urlencoded");

                var httpResponse = await client.SendAsync(requestMessage);

                if (httpResponse.IsSuccessStatusCode)
                {
                    var strResponse = await httpResponse.Content.ReadAsStringAsync();
                    var jsonResponse = JsonNode.Parse(strResponse);
                    if (jsonResponse != null)
                    {
                        accessToken = jsonResponse["access_token"]?.ToString() ?? "";
                    }
                }
                else
                {
                    // Log error response from PayPal
                    var errorResponse = await httpResponse.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error fetching PayPal access token: {errorResponse}");
                }
            }

            return accessToken;
        }
        [HttpPost]
        public async Task<JsonResult> CreateOrder()
        {
            List<OrderItem> cartItems = CartHelper.GetCartItems(Request, Response, context);
            decimal totalAmount = CartHelper.GetSubtotal(cartItems) + shippingFee;

            JsonObject createOrderRequest = new JsonObject();
            createOrderRequest.Add("intent", "CAPTURE");

            JsonObject amount = new JsonObject();
            amount.Add("currency_code", "USD");
            amount.Add("value", totalAmount);

            JsonObject purchaseUnit1 = new JsonObject();
            purchaseUnit1.Add("amount", amount);

            JsonArray purchaseUnits = new JsonArray();
            purchaseUnits.Add(purchaseUnit1);

            createOrderRequest.Add("purchase_units", purchaseUnits);

            string accessToken = await GetPaypalAccessToken();
            string url = PaypalUrl + "/v2/checkout/orders";

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                var requestMessage = new HttpRequestMessage(HttpMethod.Post, url);
                requestMessage.Content = new StringContent(createOrderRequest.ToString(), null, "application/json");
                var httpResponse = await client.SendAsync(requestMessage);

                if (httpResponse.IsSuccessStatusCode)
                {
                    var strResponse = await httpResponse.Content.ReadAsStringAsync();
                    var jsonResponse = JsonNode.Parse(strResponse);
                    if (jsonResponse != null)
                    {
                        string payPalOrderId = jsonResponse["id"]?.ToString() ?? "";
                        var approvalLink = jsonResponse["links"]?.AsArray()
                            .FirstOrDefault(link => link?["rel"]?.ToString() == "approve")?["href"]?.ToString();

                        if (!string.IsNullOrEmpty(approvalLink))
                        {
                            return new JsonResult(new { Id = payPalOrderId, ApprovalLink = approvalLink });
                        }

                        return new JsonResult(new { Id = payPalOrderId });
                    }
                }
                else
                {
                    // Log error response from PayPal
                    var errorResponse = await httpResponse.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error creating PayPal order: {errorResponse}");
                }
            }

            return new JsonResult(new { Id = "" });
        }

        [HttpPost]
        public async Task<JsonResult> CompleteOrder([FromBody] JsonObject data) {
            var orderId = data?["orderID"]?.ToString();
            var deliveryAddress = data?["deliveryAddress"]?.ToString();
            if (orderId == null || deliveryAddress == null) {
                return new JsonResult("error");
            }
            string accessToken = await GetPaypalAccessToken();
            string url = PaypalUrl + "/v2/checkout/orders/" + orderId + "/capture";
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                var requestMessage = new HttpRequestMessage(HttpMethod.Post, url);
                requestMessage.Content = new StringContent("".ToString(), null, "application/json");
                var httpResponse = await client.SendAsync(requestMessage);

                if (httpResponse.IsSuccessStatusCode) { 
                    var strResponse= await httpResponse.Content.ReadAsStringAsync();    
                    var jsonResponse= JsonNode.Parse(strResponse);
                    if (jsonResponse != null) {
                        string paypalOrderStatus = jsonResponse["status"]?.ToString() ?? "";
                        if (paypalOrderStatus == "COMPLETED") {
                            await SaveOrder(jsonResponse.ToString(),deliveryAddress);
                            return new JsonResult("success");
                        }
                    }
                }
            }

                return new JsonResult("error");
        }

        private async Task SaveOrder(string paypalResponse, string deliveryAddress)
        {

            var cartItems = CartHelper.GetCartItems(Request, Response, context);
            var appUser = await userManager.GetUserAsync(User);
            if (appUser != null)
            {
                return;
            }

            var order = new Order
            {
                ClientId = appUser.Id,
                Items =  cartItems,
                ShippingFee= shippingFee,
                DeliveryAddress= deliveryAddress,
                PaymentMethod="paypal",
                PaymentStatus="accepted",
                PaymentDetails= paypalResponse,
                OrderStatus="pending",
                CreatedAt= DateTime.Now,
            };
            context.Orders.Add(order);
            context.SaveChanges();

            Response.Cookies.Delete("shopping_cart");
            
        }
    }
}

