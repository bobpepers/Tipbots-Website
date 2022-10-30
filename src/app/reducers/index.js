import { configureStore } from '@reduxjs/toolkit'
import theme from './changeTheme';
import alert from './alert';
import nodeStatus from './nodeStatus';
import discordUser from './discordUser';
import discordUserBalance from './discordUserBalance';
import revokeDiscordToken from './revokeDiscordToken';

const store = configureStore({
  reducer: {
    theme,
    alert,
    nodeStatus,
    discordUser,
    revokeDiscordToken,
    discordUserBalance,
  },
})

export default store;
