using Microsoft.AspNetCore.Mvc;

namespace FashionFlareMVC.Controllers
{
    public class TeamController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
