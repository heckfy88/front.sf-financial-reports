import { observer } from 'mobx-react-lite';
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useStores } from '_stores/use-stores';
import styles from './styles.module.scss';

const Login = observer(() => {
  const { authStore } = useStores();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (authStore.isAuthenticated) navigate('/');
  }, [authStore.isAuthenticated, navigate]);

  // Обработчик логина
  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }

    try {
      await authStore.login(email, password);
      navigate('/');
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Ошибка авторизации');
      setPassword('');
    }
  }, [email, password, authStore, navigate]);

  // Обработка Enter
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') handleLogin();
  }, [handleLogin]);

  return (
    <div className={styles.component}>
      <div className={styles.loginContainer}>
        <h2>Вход в систему</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyPress}
            placeholder="Email"
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyPress}
            placeholder="Пароль"
          />
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button
          type="submit"
          className={styles.loginButton}
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Войти
        </button>
      </div>
    </div>
  );
});

export default Login;
