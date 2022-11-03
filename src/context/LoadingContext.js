import { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

function LoadingContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    console.log('startLoading');
    setLoading(true);
  };
  const stopLoading = () => {
    console.log('stopLoading');
    setLoading(false);
  };
  console.log('first');
  return (
    <LoadingContext.Provider
      value={{
        loading,
        startLoading,
        stopLoading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

const useLoading = () => {
  return useContext(LoadingContext);
};

export { useLoading, LoadingContext };

export default LoadingContextProvider;
