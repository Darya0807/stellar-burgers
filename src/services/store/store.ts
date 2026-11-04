import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from '../slices/ingredients/ingredientsSlice';
import orderReducer from '../slices/userOrder/orderSlice';
import feedReducer from '../slices/feed/feedSlice';
import ordersReducer from '../slices/Orders/ordersSlice';
import userReducer from '../slices/User/userSlice';
import burgerConstructorReducer from '../slices/burgerConstructor/burgerConstructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  orders: ordersReducer,
  feed: feedReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
