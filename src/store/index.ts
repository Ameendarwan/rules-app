import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { rulesReducer } from '@app/store/slices/rules';
import { setupListeners } from '@reduxjs/toolkit/query';

/**
 * Combine all reducers into a single root reducer, extend as needed
 */
export const rootReducer = combineReducers({
  rules: rulesReducer,
});

/**
 * Add any custom middleware here. Remove the `any` type and add your own middleware types.
 */
const middleware = [] as any;

/**
 * The root state of the Redux store.
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Sets up the Redux store with the specified preloaded state and devTools option.
 * @param preloadedState - The initial state of the store.
 * @param devTools - Whether to enable Redux DevTools integration. Default is true.
 * @returns The configured Redux store.
 */
export const setupStore = (preloadedState?: RootState, devTools = true) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
  });
};

/**
 * The Redux store instance.
 */
export const store = setupStore();

/**
 * Sets up the Redux Query listeners for the store.
 */
setupListeners(store.dispatch);

/**
 * The type representing the application store.
 */
export type AppStore = ReturnType<typeof setupStore>;

/**
 * The type of the dispatch function used in the Redux store.
 */
export type AppDispatch = typeof store.dispatch;
