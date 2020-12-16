namespace GifApi.Models
{
    public class Photo
    {
        public int PhotoId { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}
