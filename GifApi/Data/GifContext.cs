using GifApi.ModelConfigurationsAndValidation;
using GifApi.Models;
using GifApi.ViewModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GifApi.Data
{
    public class GifContext : IdentityDbContext
    {
        public GifContext(DbContextOptions<GifContext> opt) : base(opt)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ConfigureQuestion());
            modelBuilder.ApplyConfiguration(new ConfigureAnswer());
            modelBuilder.ApplyConfiguration(new ConfigurePhoto());


            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Subject> Subjects { get; set; }

        public DbSet<AppUserModel> AppUserModels { get; set; }  

    }
}
