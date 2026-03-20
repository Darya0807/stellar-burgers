import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../../utils/burger-api';
import { TOrder } from '../../../utils/types';
import { clearConstructor } from '../burgerConstructor/burgerConstructorSlice';

interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (ingredients: string[], { dispatch }) => {
    const { order } = await orderBurgerApi(ingredients);
    dispatch(clearConstructor());
    return { ...order, ingredients } as TOrder;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(
        submitOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload;
        }
      )
      .addCase(submitOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка при оформлении заказа';
      });
  }
});

export const { clearOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
