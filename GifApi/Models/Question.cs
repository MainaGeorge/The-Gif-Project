using System.Collections.Generic;

namespace GifApi.Models
{
    public class Question
    {
        public int QuestionId { get; set; }

        public Answer Answer { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public string Subject { get; set; }

        public string Description { get; set; }
    }
}
