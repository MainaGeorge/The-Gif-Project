using GifApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GifApi.ModelConfigurationsAndValidation
{
    public class ConfigureQuestion : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasKey(p => p.QuestionId);
            builder.Property(p => p.QuestionId).ValueGeneratedOnAdd();
            builder.Property(p => p.Description).IsRequired();
            builder.Property(p => p.Subject).IsRequired();

            builder.HasMany(p => p.Photos)
                .WithOne(p => p.Question)
                .HasForeignKey(p => p.QuestionId);

            builder.HasOne(p => p.Answer)
                .WithOne(a => a.Question)
                .HasForeignKey<Answer>(p => p.QuestionId);
        }
    }
}
