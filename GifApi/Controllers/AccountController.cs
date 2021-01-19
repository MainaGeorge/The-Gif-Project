using AutoMapper;
using GifApi.Models;
using GifApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GifApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AccountController(SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration,
            IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new AppUserModel()
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName
                };

                var createUser = await _userManager.CreateAsync(user, model.Password);
                if (createUser.Succeeded)
                    return Ok(_mapper.Map<UserDto>(user));

                foreach (var error in createUser.Errors)
                    ModelState.AddModelError("", error.Description);

                return BadRequest(ModelState);
            }
            else
                return BadRequest(ModelState);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null) return Unauthorized("incorrect password and email combination");

            var signInResult =
                await _signInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);

            if (!signInResult.Succeeded) return Unauthorized("incorrect password and email combination");

            var token = GenerateToken(user);

            var userToReturn = _mapper.Map<UserDto>(user);
            userToReturn.Token = token;

            return Ok(userToReturn);

        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        private string GenerateToken(IdentityUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var encryptedKey = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("jwt:securityKey"));

            var securityKey = new SymmetricSecurityKey(encryptedKey);

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Email, user.Email),
                }),

                Expires = DateTime.Now.AddMinutes(60),

                SigningCredentials = credentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenToReturn = tokenHandler.WriteToken(token);

            return tokenToReturn;
        }
    }
}
