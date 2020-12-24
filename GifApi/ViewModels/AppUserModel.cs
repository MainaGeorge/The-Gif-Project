using Microsoft.AspNetCore.Identity;

namespace GifApi.ViewModels
{
    public class AppUserModel : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Score { get; set; }

    }
}
