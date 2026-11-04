import { rootReducer } from './store';

describe('rootReducer', () => {
  it('Должен возвращать корректное начальное состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: expect.objectContaining({
        ingredients: [],
        isLoading: false,
        error: null
      }),
      burgerConstructor: expect.objectContaining({
        bun: null,
        ingredients: []
      }),
      order: expect.objectContaining({
        orderRequest: false,
        orderModalData: null,
        error: null
      }),
      orders: expect.objectContaining({
        orders: [],
        isLoading: false,
        error: null
      }),
      feed: expect.objectContaining({
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      }),
      user: expect.objectContaining({
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      })
    });
  });
});
