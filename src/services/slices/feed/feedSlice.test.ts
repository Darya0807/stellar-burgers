import feedReducer, { fetchFeed } from './feedSlice';

const mockOrders = [
  {
    _id: '69bd20c3a64177001b33032d',
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2026-03-20T10:26:11.384Z',
    updatedAt: '2026-03-20T10:26:11.649Z',
    number: 103104,
    ingredients: ['1', '2', '3']
  },
  {
    _id: '69bd1b5ca64177001b330327',
    status: 'done',
    name: 'Space spicy экзо-плантаго бессмертный флюоресцентный бургер',
    createdAt: '2026-03-20T10:03:08.981Z',
    updatedAt: '2026-03-20T10:03:09.207Z',
    number: 103103,
    ingredients: ['1', '2']
  }
];

describe('feedSlice', () => {
  const initialState = {
    isLoading: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
  };

  it('Должен возвращать начальное состояние', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchFeed', () => {
    it('При pending isLoading меняется на true', () => {
      const action = { type: fetchFeed.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('При fulfilled данные записываются и isLoading меняется на false', () => {
      const action = {
        type: fetchFeed.fulfilled.type,
        payload: { orders: mockOrders, total: 27098, totalToday: 51 }
      };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(27098);
      expect(state.totalToday).toBe(51);
      expect(state.error).toBeNull();
    });

    it('При rejected выдает ошибку и isLoading меняется на false', () => {
      const action = {
        type: fetchFeed.rejected.type,
        error: { message: 'Ошибка загрузки ленты' }
      };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ленты');
    });
  });
});
