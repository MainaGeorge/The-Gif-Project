namespace GifApi.Models
{
    public class Answer
    {
        public int AnswerId { get; set; }
        public string CorrectAnswer { get; set; }
        public string FirstAlternative { get; set; }
        public string SecondAlternative { get; set; } = "None of the above";
        public string ThirdAlternative { get; set; } = "All of the above";
        public Question Question { get; set; }
        public int QuestionId { get; set; }
    }
}
