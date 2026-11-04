import ordersReducer, { fetchUserOrders } from './ordersSlice';
import { TOrder } from '../../../utils/types';

const mockOrders: TOrder[] = [
  {
    _id: '69bab89aa64177001b330023',
    status: 'done',
    name: 'Био-марсианский флюоресцентный бургер',
    createdAt: '2026-03-18T14:37:14.152Z',
    updatedAt: '2026-03-18T14:37:14.357Z',
    number: 103012,
    ingredients: ['1', '2', '3']
  },
  {
    _id: '69bafafba64177001b3300b6',
    status: 'pending',
    name: 'Био-марсианский краторный бургер',
    createdAt: '2026-03-18T19:20:27.637Z',
    updatedAt: '2026-03-18T19:20:27.901Z',
    number: 103032,
    ingredients: ['1', '2', '3']
  }
];

describe('ordersSlice', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  };

  it('Должен возвращать начальное состояние', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchUserOrders', () => {
    it('При pending isLoading меняется на true', () => {
      const action = { type: fetchUserOrders.pending.type };
      const state = ordersReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('При fulfilled заказы записываются и isLoading меняется на false', () => {
      const action = {
        type: fetchUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = ordersReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.error).toBeNull();
    });

    it('При rejected выдает ошибку и isLoading меняется на false', () => {
      const action = {
        type: fetchUserOrders.rejected.type,
        error: { message: 'Ошибка загрузки заказов' }
      };
      const state = ordersReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки заказов');
      expect(state.orders).toEqual([]);
    });
  });
});
