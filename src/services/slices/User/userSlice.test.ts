import userReducer, {
  login,
  register,
  logout,
  checkUserAuth,
  updateUser
} from './userSlice';

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
    error: null
  };

  it('Должен возвращать начальное состояние', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('login', () => {
    it('При pending isLoading меняется на true', () => {
      const action = { type: login.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('При fulfilled пользователь записывается и isLoading меняется на false', () => {
      const mockUser = { email: 'test@test.com', name: 'Test User' };
      const action = { type: login.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('При rejected выдает ошибку и isLoading меняется на false', () => {
      const action = {
        type: login.rejected.type,
        error: { message: 'Ошибка входа' }
      };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка входа');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('register', () => {
    it('При pending isLoading меняется на true', () => {
      const action = { type: register.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('При fulfilled пользователь записывается и isLoading меняется на false', () => {
      const mockUser = { email: 'new@test.com', name: 'New User' };
      const action = { type: register.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('При rejected выдает ошибку и isLoading меняется на false', () => {
      const action = {
        type: register.rejected.type,
        error: { message: 'Ошибка регистрации' }
      };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка регистрации');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('logout', () => {
    it('При вызове fulfilled очищает пользователя', () => {
      const loggedInState = {
        user: { email: 'test@test.com', name: 'Test User' },
        isAuthChecked: true,
        isLoading: false,
        error: null
      };
      const action = { type: logout.fulfilled.type };
      const state = userReducer(loggedInState, action);

      expect(state.user).toBeNull();
    });
  });

  describe('checkUserAuth', () => {
    it('При вызове fulfilled с пользователем записывает данные', () => {
      const mockUser = { email: 'test@test.com', name: 'Test User' };
      const action = { type: checkUserAuth.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('При вызове fulfilled без пользователя устанавливает isAuthChecked', () => {
      const action = { type: checkUserAuth.fulfilled.type, payload: null };
      const state = userReducer(initialState, action);

      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });

    it('При вызове rejected устанавливает isAuthChecked', () => {
      const action = { type: checkUserAuth.rejected.type };
      const state = userReducer(initialState, action);

      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('При pending isLoading меняется на true', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('При fulfilled пользователь обновляется', () => {
      const mockUser = { email: 'updated@test.com', name: 'Updated User' };
      const action = { type: updateUser.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isLoading).toBe(false);
    });

    it('При rejected ошибка записывается', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Ошибка обновления' }
      };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка обновления');
    });
  });
});
