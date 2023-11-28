import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

export type AppStore = typeof store;
