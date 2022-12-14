import RunesCoin from '../assets/images/runescoin.png';
import Pirate from '../assets/images/pirate.png';
import Tokel from '../assets/images/tokel.png';
import Secret from '../assets/images/secret.png';
import Stellar from '../assets/images/stellar.png';

export const tipbotInfoArray = [
  {
    name: 'RunesTip',
    ticker: 'RUNES',
    coin: 'Runebase',
    logo: RunesCoin,
    explorer: 'https://explorer.runebase.io',
    discordLink: 'https://discord.com/api/oauth2/authorize?client_id=906563045248094249&permissions=523328&scope=bot%20applications.commands',
    telegramLink: 'https://t.me/runes_tip_bot',
    discordCommandPrefix: '/runestip',
    telegramCommandPrefix: '!runestip',
    uptimeRobotMonitorId: '791625646',
    exampleAddress: 'ReU2nhYXamYRd2VBk4auwresov6jwLEuSg',
    multiToken: false,
    userApiUrl: process.env.ENV === 'development'
      ? 'https://devwebsite.runebase.io/api/user'
      : 'https://tip.runebase.io/api/user',
  },
  {
    name: 'PirateTip',
    ticker: 'ARRR',
    coin: 'Pirate',
    logo: Pirate,
    explorer: 'https://explorer.pirate.black',
    discordLink: 'https://discord.com/api/oauth2/authorize?client_id=919753481894633474&permissions=523328&scope=bot%20applications.commands',
    telegramLink: 'https://t.me/PirateTipBot',
    discordCommandPrefix: '/piratetip',
    telegramCommandPrefix: '!piratetip',
    uptimeRobotMonitorId: '791626722',
    exampleAddress: 'zs1e3zh7a00wz4ej2lacpl2fvnrl680hkk766nt7z4ujl6rlj04n59ex7hjlnknvhwdc7vxzn0kcvt',
    multiToken: false,
    userApiUrl: process.env.ENV === 'development'
      ? 'https://devwebsite.runebase.io/api2/user'
      : 'https://pirate.runebase.io/api/user',
  },
  {
    name: 'TokelTip',
    ticker: 'TKL',
    coin: 'Tokel',
    logo: Tokel,
    explorer: 'https://explorer.tokel.io',
    discordLink: 'https://discord.com/api/oauth2/authorize?client_id=999573343000854658&permissions=523328&scope=bot%20applications.commands',
    telegramLink: 'https://t.me/TokelTip_bot',
    discordCommandPrefix: '/tokeltip',
    telegramCommandPrefix: '!tokeltip',
    uptimeRobotMonitorId: '792311676',
    exampleAddress: 'RAKZ3UY99x5GRGMJ8AKr1Yqxs8Rqnr7YGb',
    userApiUrl: 'https://tokel.runebase.io/api/user',
  },
  {
    name: 'SecretTip',
    ticker: 'SCRT',
    coin: 'Secret Network',
    logo: Secret,
    explorer: 'https://www.mintscan.io/secret',
    discordLink: 'https://discord.com/api/oauth2/authorize?client_id=1017103311570223144&permissions=523328&scope=bot%20applications.commands',
    telegramLink: 'https://t.me/SecretTip_bot',
    discordCommandPrefix: '/secrettip',
    telegramCommandPrefix: '!secrettip',
    uptimeRobotMonitorId: '792646669',
    exampleAddress: 'secret1fsw6l4nkvy3pnjynnqyehdyhvh26qk4y9hvnru',
    multiToken: false,
    userApiUrl: 'https://secret.runebase.io/api/user',
  },
  {
    name: 'StellarTip',
    ticker: 'XLM',
    coin: 'Stellar Lumens',
    logo: Stellar,
    explorer: 'https://stellarchain.io/',
    discordLink: 'https://discord.com/api/oauth2/authorize?client_id=1024632097199108138&permissions=523328&scope=bot%20applications.commands',
    telegramLink: 'https://t.me/stellartip_bot',
    discordCommandPrefix: '/stellartip',
    telegramCommandPrefix: '!stellartip',
    uptimeRobotMonitorId: '792830503',
    exampleAddress: 'GBBZSVVHGE2RV642Z6BYO6EU4RZVAC56D2YHJDE7AZIU6LZSRYBVRWAM',
    userApiUrl: 'https://stellar.runebase.io/api/user',
    multiToken: true,
    tokens: [
      'DXLM',
    ],
  },
]
