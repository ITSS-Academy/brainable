import { createReducer, on } from '@ngrx/store';
import * as SearchActions from './search.actions';
import { SearchState } from './search.state';

export const initialState: SearchState = {
  searchResults: [],
  isSearchingSuccess: false,
  searchError: '',
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.search, (state) => {
    return {
      ...state,
      isSearchingSuccess: false,
      searchError: '',
    };
  }),
  on(SearchActions.searchSuccess, (state, { results }) => {
    return {
      ...state,
      searchResults: results,
      isSearchingSuccess: true,
    };
  }),
  on(SearchActions.searchFailure, (state, { errorMessage }) => {
    return {
      ...state,
      searchError: errorMessage,
    };
  }),
  on(SearchActions.clearSearchResults, (state) => {
    return {
      ...state,
      searchResults: [],
      isSearchingSuccess: false,
      searchError: '',
    };
  }),
);
