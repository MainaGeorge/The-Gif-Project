using GifApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GifApi.ModelConfigurationsAndValidation
{
    public class ConfigureAnswer : IEntityTypeConfiguration<Answer>
    {
        public void Configure(EntityTypeBuilder<Answer> builder)
        {
            builder.HasKey(p => p.AnswerId);
            builder.Property(p => p.AnswerId).ValueGeneratedOnAdd();
            builder.Property(p => p.CorrectAnswer).IsRequired();
            builder.Property(p => p.FirstAlternative).IsRequired();
            builder.Property(p => p.SecondAlternative).HasDefaultValue("All the above");
            builder.Property(p => p.ThirdAlternative).HasDefaultValue("None of the above");
        }
    }
}
