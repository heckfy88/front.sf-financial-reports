import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useApi } from '../services/use-api';
import AuthStore from './auth.store';
import TransactionsStore from "./transactions.store";
import { StoresContext } from './stores-context';
import { autorun } from "mobx";

export const StoresProvider = ({ children }) => {
  const api = useApi();


  const stores = useMemo(() => {
    if (!api || typeof api.post !== 'function') {
      console.error('API instance is invalid:', api);
      return null;
    }

    const authStore = new AuthStore(api);
    const transactionsStore = new TransactionsStore(api);

    autorun(() => {
      if (authStore.isAuthenticated) {
        transactionsStore.loadTransactions();
        transactionsStore.loadStatuses();
        transactionsStore.loadCategories();
      }
    });

    return { authStore, transactionsStore }
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
