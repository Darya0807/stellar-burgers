import { useDispatch, useSelector } from '../../services/store/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients/ingredientsSlice';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const { isLoading, error, ingredients } = useSelector(
    (state) => state.ingredients
  );

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div
        className={`${styles.error} text text_type_main-medium text_color_inactive pt-10`}
      >
        Ошибка: {error}
      </div>
    );
  }

  if (!ingredients.length) {
    return (
      <div
        className={`${styles.empty} text text_type_main-medium text_color_inactive pt-10`}
      >
        Нет ингредиентов
      </div>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
