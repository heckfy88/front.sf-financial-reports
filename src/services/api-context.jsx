import { createContext } from 'react';
import PropTypes from 'prop-types';
import api from './api.service';

// eslint-disable-next-line react-refresh/only-export-components
export const ApiContext = createContext(api);

export const ApiProvider = ({ children }) => (
  <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
);

ApiProvider.propTypes = {
  children: PropTypes.node,
};
