import { FC, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store/store';
import { login } from '../../services/slices/User/userSlice';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate(from, { replace: true });
    } catch (err) {
      setError('Ошибка входа. Проверьте email и пароль.');
    }
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
