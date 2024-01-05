/* import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // adjust this import to your slice file location

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
 */
// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

function makeStore() {
  const isClient = typeof window !== 'undefined';
  const persistedState = isClient && window.localStorage.getItem('reduxState')
    ? JSON.parse(window.localStorage.getItem('reduxState'))
    : {};

  const store = configureStore({ reducer: rootReducer, preloadedState: persistedState });

  if (isClient) {
    store.subscribe(() => {
      window.localStorage.setItem('reduxState', JSON.stringify(store.getState()))
    });
  }

  return store;
}

export const store = makeStore();
