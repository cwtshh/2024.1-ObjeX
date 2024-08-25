import React from 'react';

const NotifyToast = ({ message, toast_type }) => {
  switch(toast_type) {
    case 'erro': {
      return (
        <div className="toast toast-top toast-end mt-[72px] mr-[4px]">
          <div className="alert alert-info flex justify-center items-center">
            <span className='text-warning-content'>{message}</span>
          </div>
        </div>
      );
    }
    
    case 'sucesso': {
      return (
        <div className="toast toast-top toast-end mt-[72px] mr-[4px]">
          <div className="alert alert-success flex justify-center items-center">
            <span className='text-success-content'>{message}</span>
          </div>
        </div>
      );
    }

    case 'alerta': {
      return (
        <div className="toast toast-top toast-end mt-[72px] mr-[4px]">
          <div className="alert alert-warning flex justify-center items-center">
            <span className='text-warning-content'>{message}</span>
          </div>
        </div>
      );
    }

    default: {
      return (
        <div className="toast toast-top toast-end mt-[72px] mr-[4px]">
          <div className="alert alert-warning flex justify-center items-center">
            <span className='text-warning-content'>{message}</span>
          </div>
        </div>
      );
    }
  }
}

export default NotifyToast;