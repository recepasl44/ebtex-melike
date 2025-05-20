import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loginUser } from '../../../../slices/auth/login/thunk';
import { AppDispatch } from '../../../../store';
import { LoginPayload } from '../../../../types/auth/login/login';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../store/rootReducer';
import { toast } from 'react-toastify';
import { LoginStatus } from '../../../../enums/auth/login/login';

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, isLoggedIn } = useSelector((state: RootState) => state.login);


  const loading = status === LoginStatus.LOGGING_IN;
  const success = status === LoginStatus.LOGGED_IN;
  
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [loginData, setLoginData] = useState<LoginPayload>({
    email: 'super@admin.com',
    password: '1234',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const doLogin = async (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const resultAction = await dispatch(loginUser(loginData));
      unwrapResult(resultAction);

    
      navigate('/dashboard/sales');
    } catch (err: any) {
  
      toast.error(err || 'Giriş başarısız');
   
    }
  };

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  return {
    loginData,
    errorMessage,
    passwordShow,
    handleChange,
    doLogin, 
    togglePassword,
    loading, 
    success,
    isLoggedIn,
  };
}

export default useLogin;
