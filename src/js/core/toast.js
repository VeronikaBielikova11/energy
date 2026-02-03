import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const defaultOptions = {
  position: 'topRight',
  timeout: 5000,
};

export const toast = {
  success(message) {
    iziToast.success({
      ...defaultOptions,
      title: 'Success',
      message,
    });
  },

  error(message) {
    iziToast.error({
      ...defaultOptions,
      title: 'Error',
      message,
    });
  },

  warning(message) {
    iziToast.warning({
      ...defaultOptions,
      title: 'Warning',
      message,
    });
  },

  info(message) {
    iziToast.info({
      ...defaultOptions,
      title: 'Info',
      message,
    });
  },
};
