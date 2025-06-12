

import { useEffect } from 'react';
import LoginForm from './LoginForm';

export default function Login() {
  useEffect(() => {
    document.body.classList.add('authentication-background');
    return () => {
      document.body.classList.remove('authentication-background');
    };
  }, []);

  return <LoginForm />;
}
