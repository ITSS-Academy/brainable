import { Categories, CategoriesByUid } from '../../models/categories.model';

export interface CategoriesState {
  categories: CategoriesByUid[];
  isGetAllCategoriesLoading: boolean;
  isGetAllCategoriesSuccessful: boolean;
  getAllCategoriesErrorMessage: string;

  category: CategoriesByUid;
  isGetCategoryLoading: boolean;
  isGetCategorySuccessful: boolean;
  getCategoryErrorMessage: string;
}
