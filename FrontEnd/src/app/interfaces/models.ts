export interface Question {
  answer: Answer;
  subject: string;
  description: string;
  photos?: Photo[];
}

export interface Answer {
  correctAnswer: string;
  firstAlternative: string;
  secondAlternative: string;
  thirdAlternative: string;
}

export interface LoginModel{
  password: string,
  email: string
}

export interface Photo {
  photoId: number;
  questionId: number;
}

export interface AppUser {
  email: string,
  token: string,
  score: number
}
