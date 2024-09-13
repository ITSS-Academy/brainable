export interface Question {
  id: string;
  question: string;
  answer: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  imgUrl: string;
  timeLimit: number;
  points: number;
  //[key: string]: string | number; // Add this line
}

export interface QuestionDTO {
  question: string;
  answer: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  imgUrl: string;
  timeLimit: number;
  points: number;
}

export interface MissingField {
  questionIndex: number;
  question: Question;
  missingFields: string[];
}
