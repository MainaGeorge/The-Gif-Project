using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GifApi.ViewModels
{
    public class RegisterModel
    {
        [Required]
        [Column(TypeName = "varchar(20)")]
        public string UserName { get; set; }

        [Required]
        [Column(TypeName = "varchar(20)")]
        public string FirstName { get; set; }

        [Required]
        [Column(TypeName = "varchar(20)")]
        public string LastName { get; set; }

        [Required]
        [DataType(dataType: DataType.Password)]
        public string Password { get; set; }


        [Required]
        [DataType(dataType: DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords must match")]
        public string ConfirmPassword { get; set; }

        [Required]
        [DataType(dataType: DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
