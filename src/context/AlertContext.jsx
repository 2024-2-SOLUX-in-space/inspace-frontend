import React, { createContext, useContext, useState } from 'react';
import Alert from '../components/alert';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ 
    isOpen: false, 
    message: "",
    onConfirm: null,
    confirmText: "확인"   
  });

  const showAlert = (message, onConfirm = null, confirmText = "확인") => {
    setAlert({
      isOpen: true,
      message,
      onConfirm,
      confirmText
    });
  };

  const closeAlert = () => {
    setAlert({ 
      isOpen: false, 
      message: "", 
      onConfirm: null,
      confirmText: "확인" 
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {/* Alert 컴포넌트를 Provider 내부에서 렌더링 */}
      <Alert
        isOpen={alert.isOpen}
        message={alert.message}
        onClose={closeAlert}
        onConfirm={alert.onConfirm}
        confirmText={alert.confirmText}
      />
    </AlertContext.Provider>
  );
};

// Alert 사용을 위한 커스텀 훅
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}; 