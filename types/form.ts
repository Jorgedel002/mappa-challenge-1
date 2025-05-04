export type QuestionType = 'short-answer' | 'long-answer' | 'number' | 'radio';

export interface FormQuestion {
  id: string;
  title: string;
  type: QuestionType;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  questions: FormQuestion[];
  createdAt: Date;
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: {
    questionId: string;
    answer: string | number;
  }[];
  submittedAt: Date;
}
