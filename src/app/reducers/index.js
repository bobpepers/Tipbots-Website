import { configureStore } from '@reduxjs/toolkit'
import theme from './changeTheme';
import alert from './alert';
import nodeStatus from './nodeStatus';

const store = configureStore({
  reducer: {
    theme,
    alert,
    nodeStatus,
  },
})

export default store;
