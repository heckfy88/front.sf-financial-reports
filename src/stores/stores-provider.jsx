import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useApi } from '../services/use-api';
import AuthStore from './auth.store';
import TransactionsStore from "./transactions.store";
import { StoresContext } from './stores-context';

export const StoresProvider = ({ children }) => {
  const api = useApi();


  const stores = useMemo(() => {
    if (!api || typeof api.post !== 'function') {
      console.error('API instance is invalid:', api);
      return null;
    }

    return { authStore: new AuthStore(api), transactionsStore: new TransactionsStore(api) }
  }, [api]);

  return (
    <StoresContext.Provider value={stores}>
      {children}
    </StoresContext.Provider>
  );
};

StoresProvider.propTypes = {
  children: PropTypes.node,
};
