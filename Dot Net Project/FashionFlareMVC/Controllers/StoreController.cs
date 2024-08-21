using FashionFlareMVC.Models;
using FashionFlareMVC.Services;
using Microsoft.AspNetCore.Mvc;

namespace FashionFlareMVC.Controllers
{
    public class StoreController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly int pageSize = 8;

        public StoreController(ApplicationDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index(int pageIndex,String? search, String? brand,String? category,string? sort)
        {
            IQueryable<Product> query =context.Products;

            // var products = context.Products.OrderByDescending(p=>p.Id).ToList();  
            if (search != null && search.Length > 0) { 
                query = query.Where(p=>p.Name.Contains(search));
            }

            //filter

            if (brand  != null && brand.Length > 0)
            {
                query = query.Where(p => p.Brand.Contains(brand));
            }
            if (category != null && category.Length > 0)
            {
                query = query.Where(p => p.Category.Contains(category));
            }
            //sort
            if (sort == "price_asc")
            {
                query = query.OrderBy(p => p.Price);
            }
            else if (sort == "price_desc")
            {
                query = query.OrderByDescending(p => p.Price);
            }
            else {
                query = query.OrderByDescending(p => p.CreatedAt);
            }

            //paging
            if (pageIndex < 1)
            {
                pageIndex = 1;
            }

            decimal count = query.Count();
            int totalPages = (int)Math.Ceiling(count / pageSize);
            query = query.Skip((pageIndex - 1) * pageSize).Take(pageSize);
            var products = query.ToList();
            ViewBag.Products = products;
            ViewBag.PageIndex = pageIndex;
            ViewBag.TotalPages = totalPages;


            var storeSearchModel = new StoreSearchModel()
            {
                Search = search,
                Brand = brand,
                Category = category,
                Sort = sort
            };
            return View(storeSearchModel);
        }

        public IActionResult Details(int id)
        {
            var product = context.Products.Find(id);
            if (product == null)
            {
                return RedirectToAction("Index", "Store");
            }

            return View(product);
        }
    }
}



