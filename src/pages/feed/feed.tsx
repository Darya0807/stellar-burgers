import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import { fetchFeed } from '../../services/slices/feed/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredients/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading: isFeedLoading } = useSelector(
    (state) => state.feed
  );
  const { isLoading: isIngredientsLoading } = useSelector(
    (state) => state.ingredients
  );

  const isLoading = isFeedLoading || isIngredientsLoading;

  useEffect(() => {
    dispatch(fetchFeed());
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
