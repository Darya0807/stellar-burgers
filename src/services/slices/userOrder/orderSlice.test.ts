import orderReducer, { submitOrder, clearOrderModal } from './orderSlice';

describe('orderSlice', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  it('Должен возвращать начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('submitOrder', () => {
    it('При pending orderRequest меняется на true', () => {
      const action = { type: submitOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('При fulfilled orderModalData записывается и orderRequest меняется на false', () => {
      const mockOrder = {
        _id: '69bd25dfa64177001b330336',
        owner: '',
        status: 'done',
        name: 'Био-марсианский spicy краторный бургер',
        createdAt: '2026-03-20T10:47:59.921Z',
        updatedAt: '2026-03-20T10:48:00.223Z',
        number: 103106,
        ingredients: ['1', '2', '3'],
        price: 3024
      };
      const action = { type: submitOrder.fulfilled.type, payload: mockOrder };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('При rejected выдает ошибку и orderRequest меняется на false', () => {
      const action = {
        type: submitOrder.rejected.type,
        error: { message: 'Ошибка при оформлении заказа' }
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('Ошибка при оформлении заказа');
    });
  });

  describe('clearOrderModal', () => {
    it('Должен очищать данные заказа', () => {
      const stateWithOrder = {
        orderRequest: false,
        orderModalData: {
          _id: '69bd25dfa64177001b330336',
          number: 103106
        } as any,
        error: null
      };
      const action = clearOrderModal();
      const state = orderReducer(stateWithOrder, action);

      expect(state.orderModalData).toBeNull();
    });
  });
});
