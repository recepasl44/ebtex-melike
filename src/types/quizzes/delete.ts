import QuizzesListStatus from '../../enums/quizzes/list';

export interface QuizzesDeletePayload {
  id?: number;
}

export interface QuizzesDeleteResponse {
  success: boolean;
  message: string;
}

export interface QuizzesDeleteState {
  data: QuizzesDeleteResponse | null;
  status: QuizzesListStatus;
  error: string | null;
}
