import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import GlobalSpinner from '../utils/GlobalSpinner';
import React from 'react';
import { DEFAULT_URL } from '../helpers/url_helper';

const axiosInstance = axios.create({
  baseURL: DEFAULT_URL,
  headers: {
    'Content-Type': 'application/json',

  },
});

let pendingRequests = 0;
let spinnerContainer: HTMLElement | null = document.getElementById('global-spinner-container');
let spinnerRoot: ReactDOM.Root | null = null;

function showSpinner() {
  if (!spinnerContainer) {
    spinnerContainer = document.createElement('div');
    spinnerContainer.id = 'global-spinner-container';
    document.body.appendChild(spinnerContainer);
  }
  if (!spinnerRoot) {
    spinnerRoot = ReactDOM.createRoot(spinnerContainer);
  }
  spinnerRoot.render(React.createElement(GlobalSpinner));
}

function hideSpinner() {
  if (spinnerRoot) {
    spinnerRoot.unmount();
    spinnerRoot = null;
  }
  if (spinnerContainer) {
    spinnerContainer.remove();
    spinnerContainer = null;
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    pendingRequests++;
    showSpinner();
    if (config.headers) {
      delete config.headers.Accept;
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    pendingRequests = Math.max(pendingRequests - 1, 0);
    if (pendingRequests === 0) {
      hideSpinner();
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    pendingRequests = Math.max(pendingRequests - 1, 0);
    if (pendingRequests === 0) {
      hideSpinner();
    }
    const method = response.config.method?.toLowerCase();
    if (['post', 'put', 'delete'].includes(method || '')) {
      const message = response.data?.message || 'İşlem başarılı';
      toast.success(message);
    }
    return response;
  },
  (error) => {
    pendingRequests = Math.max(pendingRequests - 1, 0);
    if (pendingRequests === 0) {
      hideSpinner();
    }
    const method = error.config?.method?.toLowerCase();
    if (['post', 'put', 'delete'].includes(method || '')) {
      const errorMessage = error.response?.data?.message || 'İşlem başarısız';
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);



export default axiosInstance;
