import { createAction } from '@ngrx/store';

export const storeImageUpload = createAction('[Storage] Store Image Upload');

export const storeImageUploadSuccess = createAction(
  '[Storage] Store Image Upload Success',
);

export const storeSettingUpload = createAction(
  '[Storage] Store Setting Upload',
);

export const storeSettingUploadSuccess = createAction(
  '[Storage] Store Setting Upload Success',
);

export const clearStorageState = createAction('[Storage] Clear Storage State');
