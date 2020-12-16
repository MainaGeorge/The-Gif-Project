using System.Threading.Tasks;
using GifApi.Data;
using GifApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GifApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly GifContext _context;

        public AnswersController(GifContext context)
        {
            _context = context;
        }

        [HttpGet("{answerId}")]
        public async Task<ActionResult<Answer>> GetAnswer(int answerId)
        {
            return await _context.Answers.FindAsync(answerId);
        }

    }
}
