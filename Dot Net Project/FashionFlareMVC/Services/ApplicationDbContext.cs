using FashionFlareMVC.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FashionFlareMVC.Services
{
    public class ApplicationDbContext:IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }
    

        public DbSet<Product> Products { get; set; }
		public DbSet<Order> Orders { get; set; }
	}
}
