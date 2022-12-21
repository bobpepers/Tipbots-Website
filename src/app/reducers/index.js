import { configureStore } from '@reduxjs/toolkit'
import theme from './changeTheme';
import alert from './alert';
import nodeStatus from './nodeStatus';
import botInfo from './botInfo';
import coinInfo from './coinInfo';
import currencies from './currencies';

import discordUser from './discordUser';
import discordUserBalance from './discordUserBalance';
import revokeDiscordToken from './revokeDiscordToken';

import telegramUser from './telegramUser';
import telegramUserBalance from './telegramUserBalance';
import revokeTelegramToken from './revokeTelegramToken';
import history from './history';

const store = configureStore({
  reducer: {
    theme,
    alert,
    nodeStatus,
    botInfo,
    coinInfo,
    currencies,
    history,

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
