import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import { fetchUserOrders } from '../../services/slices/Orders/ordersSlice';
import { Preloader } from '@ui';
import { fetchIngredients } from '../../services/slices/ingredients/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading: isOrdersLoading } = useSelector(
    (state) => state.orders
  );
  const { isLoading: isLoadingIngredients } = useSelector(
    (state) => state.ingredients
  );
  const isLoading = isLoadingIngredients || isOrdersLoading;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
