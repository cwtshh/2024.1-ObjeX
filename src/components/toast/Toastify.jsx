import { Icons, toast } from 'react-toastify';

export const ToastifyNotificate = ({ message, type }) => {
  if(type === 'warning') {
    toast.warning(`${message}`, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'bg-base-100 md:w-[15vw] w-[75vw]',
      bodyClassName: 'font-bold text-warning-content opacity-60',
      closeButton: false,
      progressClassName: 'bg-warning',
      icon: Icons.info,
    });
  }
  if(type === 'success') {
    toast.success(`${message}`, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'bg-base-100 md:w-[15vw] w-[75vw]',
      bodyClassName: 'font-bold text-warning-content opacity-60',
      closeButton: false,
      progressClassName: 'bg-success',
      icon: Icons.success,
    });
  }
  if(type === 'error') {
    toast.error(`${message}`, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'bg-base-100 md:w-[15vw] w-[75vw]',
      bodyClassName: 'font-bold text-warning-content opacity-60',
      closeButton: false,
      progressClassName: 'bg-error',
      icon: Icons.error,
    });
  }
}