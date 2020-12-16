using GifApi.Data;
using GifApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GifApi.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly GifContext _context;

        public QuestionsController(GifContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Question>> GetAll(string subject)
        {
            return await _context.Questions
                .Where(q => q.Subject.Contains(subject))
                .Include(p => p.Answer)
                .Include(p => p.Photos)
                .ToListAsync();
        }

        [HttpGet("{id:int}", Name = "AddQuestion")]
        public async Task<Question> GetById(int id)
        {
            return await _context.Questions.FindAsync(id);
        }

        [HttpPost("subject")]
        public async Task<IActionResult> AddSubject([FromBody] Subject subject)
        {
            if (await _context.Subjects.AnyAsync(s => s.Name.ToLower().Equals(subject.Name.ToLower())))
                return BadRequest();

            await _context.Subjects.AddAsync(subject);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("all/subjects")]
        public async Task<IEnumerable<string>> GetSubjects()
        {
            return await _context.Subjects.Select(x => x.Name).ToListAsync();
        }

        [HttpGet("{subject}")]
        public async Task<IEnumerable<Question>> GetBySubject(string subject)
        {
            return await _context.Questions
                .Where(q => q.Subject.Contains(subject))
                .Include(q => q.Answer)
                .Include(q => q.Photos)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> AddQuestion([FromBody] Question questionModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _context.Questions.AddAsync(questionModel);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetById), new { id = questionModel.QuestionId }, questionModel);
        }

    }
}
