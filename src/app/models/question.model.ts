export interface Question {
  question: string;
  answer: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  imgUrl: string;
  timeLimit: number;
}

export interface QuestionDTO {
  question: {
    quizId: string;
    question: string;
    answer: number;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    timeLimit: number;
  };
}

// model for question channel
export interface QuestionChannel {
  pin: string;
  question: string;
  answer: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  timeLimit: number;
  quizId: string;
}
