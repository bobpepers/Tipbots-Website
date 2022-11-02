import { configureStore } from '@reduxjs/toolkit'
import theme from './changeTheme';
import alert from './alert';
import nodeStatus from './nodeStatus';
import discordUser from './discordUser';
import discordUserBalance from './discordUserBalance';
import revokeDiscordToken from './revokeDiscordToken';

import telegramUser from './telegramUser';
import telegramUserBalance from './telegramUserBalance';
import revokeTelegramToken from './revokeTelegramToken';

const store = configureStore({
  reducer: {
    theme,
    alert,
    nodeStatus,

    // Discord
    discordUser,
    revokeDiscordToken,
    discordUserBalance,

    // Telegram
    telegramUser,
    revokeTelegramToken,
    telegramUserBalance,
  },
})

export default store;
