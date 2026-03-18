import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import {
  Feed,
  ForgotPassword,
  ConstructorPage,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import {
  ProtectedRouteAuth,
  ProtectedRouteUnAuth
} from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/slices/userSlice';
import { OrderModal } from '../order-modal/order-modal';
import { IngredientModal } from '../ingredient-details-modal/ingredient-details-modal';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRouteUnAuth>
              <Login />
            </ProtectedRouteUnAuth>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRouteUnAuth>
              <Register />
            </ProtectedRouteUnAuth>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRouteUnAuth>
              <ForgotPassword />
            </ProtectedRouteUnAuth>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRouteUnAuth>
              <ResetPassword />
            </ProtectedRouteUnAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRouteAuth>
              <Profile />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRouteAuth>
              <ProfileOrders />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRouteAuth>
              <div className={styles.detailPageWrap}>
                <OrderInfo />
              </div>
            </ProtectedRouteAuth>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={<OrderModal onClose={handleModalClose} />}
          />
          <Route
            path='/ingredients/:id'
            element={<IngredientModal onClose={handleModalClose} />}
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRouteAuth>
                <OrderModal onClose={handleModalClose} />
              </ProtectedRouteAuth>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
