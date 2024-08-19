import { Categories } from '../../models/categories.model';

export interface CategoriesState {
  getAllCategories: Categories[];
  isGetAllCategoriesLoading: boolean;
  isGetAllCategoriesSuccessful: boolean;
  getAllCategoriesErrorMessage: string;
}
