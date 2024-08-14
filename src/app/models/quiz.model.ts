

export interface Questions {
  id: number;
  text: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  answer?: string;
  timeLimit?: number;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: Date;
  plays: number;
}

export interface QuizDTO {
  quiz: {
    title: string;
    description: string;
    isPublic: boolean;
  };
}

export interface Topic {
  title: string;
  text: string;
  questions: number;
  plays: number;
}

