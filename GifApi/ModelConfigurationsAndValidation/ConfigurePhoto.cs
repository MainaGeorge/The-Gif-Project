using GifApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GifApi.ModelConfigurationsAndValidation
{
    public class ConfigurePhoto : IEntityTypeConfiguration<Photo>
    {
        public void Configure(EntityTypeBuilder<Photo> builder)
        {
            builder.HasKey(p => p.PhotoId);
            builder.Property(p => p.PhotoId).IsRequired();
        }
    }
}
