import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './burgerConstructorSlice';
import { TIngredient } from '../../../utils/types';

const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: '',
  image_mobile: '',
  image_large: ''
};

const mockMain: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: '',
  image_mobile: '',
  image_large: ''
};

const mockSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('Должен возвращать начальное состояние', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('addIngredient', () => {
    it('Должен добавлять булку в конструктор', () => {
      const action = addIngredient(mockBun);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toBeDefined();
      expect(state.bun?._id).toBe('643d69a5c3f7b9001cfa093c');
      expect(state.bun?.type).toBe('bun');
      expect(state.ingredients).toHaveLength(0);
    });

    it('Должен добавлять ингредиент в конструктор', () => {
      const action = addIngredient(mockSauce);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0942');
    });

    it('Должен заменять булку при добавлении новой', () => {
      const firstBun = addIngredient(mockBun);
      let state = constructorReducer(initialState, firstBun);

      const newBun: TIngredient = {
        ...mockBun,
        _id: 'new',
        name: 'Новая булка'
      };
      const secondBun = addIngredient(newBun);
      state = constructorReducer(state, secondBun);

      expect(state.bun?._id).toBe('new');
    });
  });

  describe('removeIngredient', () => {
    it('Должен удалять ингредиент из конструктора', () => {
      const addAction = addIngredient(mockSauce);
      let state = constructorReducer(initialState, addAction);

      const ingredientId = state.ingredients[0].id;
      const removeAction = removeIngredient(ingredientId);
      state = constructorReducer(state, removeAction);

      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('moveIngredient', () => {
    it('Должен перемещать ингредиент вверх', () => {
      const add1 = addIngredient(mockSauce);
      const add2 = addIngredient(mockMain);
      let state = constructorReducer(initialState, add1);
      state = constructorReducer(state, add2);

      const moveAction = moveIngredientUp(1);
      state = constructorReducer(state, moveAction);

      expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0941');
      expect(state.ingredients[1]._id).toBe('643d69a5c3f7b9001cfa0942');
    });

    it('Должен перемещать ингредиент вниз', () => {
      const add1 = addIngredient(mockSauce);
      const add2 = addIngredient(mockMain);
      let state = constructorReducer(initialState, add1);
      state = constructorReducer(state, add2);

      const moveAction = moveIngredientDown(0);
      state = constructorReducer(state, moveAction);

      expect(state.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0941');
      expect(state.ingredients[1]._id).toBe('643d69a5c3f7b9001cfa0942');
    });
  });

  describe('clearConstructor', () => {
    it('Должен очищать конструктор', () => {
      const bunAction = addIngredient(mockBun);
      const ingredientAction = addIngredient(mockSauce);

      let state = constructorReducer(initialState, bunAction);
      state = constructorReducer(state, ingredientAction);

      state = constructorReducer(state, clearConstructor());

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
