import { createAction, props } from '@ngrx/store';
import { Quiz, QuizDTO } from '../../models/quiz.model';
import { Question } from '../../models/question.model';

export const getAllQuiz = createAction(
  '[Quiz] Get All Quiz',
  props<{ idToken: string }>(),
);

export const getAllQuizSuccess = createAction(
  '[Quiz] Get All Quiz Success',
  props<{ quiz: Quiz[] }>(),
);

export const getAllQuizFailure = createAction(
  '[Quiz] Get All Quiz Failure',
  props<{ errorMessage: string }>(),
);

export const getQuizById = createAction(
  '[Quiz] Get Quiz By Id',
  props<{ id: string }>(),
);

export const getQuizByIdSuccess = createAction(
  '[Quiz] Get Quiz By Id Success',
  props<{ quiz: Quiz }>(),
);

export const getQuizByIdFailure = createAction(
  '[Quiz] Get Quiz By Id Failure',
  props<{ errorMessage: string }>(),
);

export const createQuiz = createAction(
  '[Quiz] Create Quiz',
  props<{ idToken: string; quiz: any }>(),
);

export const createQuizSuccess = createAction('[Quiz] Create Quiz Success');

export const createQuizFailure = createAction(
  '[Quiz] Create Quiz Failure',
  props<{ errorMessage: string }>(),
);

export const updateQuiz = createAction(
  '[Quiz] Update Quiz',
  props<{ idToken: string; quiz: QuizDTO }>(),
);

export const updateQuizSuccess = createAction('[Quiz] Update Quiz Success');

export const updateQuizFailure = createAction(
  '[Quiz] Update Quiz Failure',
  props<{ errorMessage: string }>(),
);

export const updateQuestionByIndex = createAction(
  '[Quiz] Update Question By Index',
  props<{ question: Question; index: number }>(),
);

export const updateQuestionByImport = createAction(
  '[Quiz] Update Question By Import',
  props<{ questions: Question[] }>(),
);

export const updateQuestionByImportWord = createAction(
  '[Quiz] Update Question By Import Word',
  props<{ questions: Question[] }>(),
);
export const updateQuestionByImportCSV = createAction(
  '[Quiz] Update Question By Import CSV',
  props<{ questions: Question[] }>(),
);

export const updateSetting = createAction(
  '[Quiz] Update Setting',
  props<{ setting: any }>(),
);

export const storeCurrentQuiz = createAction(
  '[Quiz] Store Current Quiz',
  props<{ quiz: Quiz }>(),
);

export const addNewQuestion = createAction('[Quiz] Add New Question');

export const duplicateQuestionByIndex = createAction(
  '[Quiz] Duplicate Question By Index',
  props<{ index: number }>(),
);

export const deleteQuestionByIndex = createAction(
  '[Quiz] Delete Question By Index',
  props<{ index: number }>(),
);

export const storeDefaultQuiz = createAction(
  '[Quiz] Store Default Quiz',
  props<{ quiz: Quiz }>(),
);

export const deleteQuiz = createAction(
  '[Quiz] Delete Quiz',
  props<{ idToken: string; id: string }>(),
);

export const deleteQuizSuccess = createAction('[Quiz] Delete Quiz Success');

export const deleteQuizFailure = createAction(
  '[Quiz] Delete Quiz Failure',
  props<{ errorMessage: string }>(),
);

export const clearQuizState = createAction('[Quiz] Clear Quiz State');

export const saveDraft = createAction(
  '[Quiz] Save Draft',
  props<{ questions: Question }>(),
);
