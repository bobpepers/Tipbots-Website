import React, {
  useEffect,
  lazy,
} from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toggleTheme from './helpers/toggleTheme';
import { tipbotInfoArray } from './helpers/tipbotsInfoArray';
import DiscordDashboard from './views/dashboard/Discord';
import TelegramDashboard from './views/dashboard/Telegram';
import HistoryDashboard from './views/dashboard/History';
import Tipbot from './views/Tipbot';
import CoinInfo from './views/CoinInfo';

const Home = lazy(() => import('./views/Home'));
const Uptime = lazy(() => import('./views/Uptime'));
// const Tipbot = lazy(() => import('./views/Tipbot'));
const PrivacyPolicy = lazy(() => import('./views/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./views/TermsOfService'));
const Support = lazy(() => import('./views/Support'));
// const DiscordDashboard = lazy(() => import('./views/dashboard/Discord'));
// const TelegramDashboard = lazy(() => import('./views/dashboard/Telegram'));

const RoutesX = function (props) {
  const {
    theme,
  } = props;
  useEffect(() => {
    toggleTheme(theme);
  }, [
    theme,
  ]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/uptime"
        element={<Uptime />}
      />
      <Route
        path="/support"
        element={<Support />}
      />
      <Route
        path="/dashboard/discord"
        element={<DiscordDashboard />}
      />
      <Route
        path="/dashboard/telegram"
        element={<TelegramDashboard />}
      />
      <Route
        path="/dashboard/telegram"
        element={<DiscordDashboard />}
      />
      <Route
        path="/dashboard/matrix"
        element={<DiscordDashboard />}
      />
      <Route
        path="/dashboard/:chatClient/history/:botName"
        element={<HistoryDashboard />}
      />
      <Route
        path="/tipbots/:botName/coin/:coinTicker"
        element={<CoinInfo />}
      />
      {tipbotInfoArray.map((tipbot) => (
        <Route
          key={`tipbot-${tipbot.name}`}
          path={`/tipbots/${tipbot.name.toLowerCase()}`}
          element={<Tipbot />}
        />
      ))}
      {tipbotInfoArray.map((tipbot) => (
        <Route
          key={`tipbot-${tipbot.name}-tos`}
          path={`/tipbots/${tipbot.name.toLowerCase()}/terms-of-service`}
          element={<TermsOfService />}
        />
      ))}
      {tipbotInfoArray.map((tipbot) => (
        <Route
          key={`tipbot-${tipbot.name}-pp`}
          path={`/tipbots/${tipbot.name.toLowerCase()}/privacy-policy`}
          element={<PrivacyPolicy />}
        />
      ))}
    </Routes>
  )
}

RoutesX.propTypes = {
  theme: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme,
})

export default connect(mapStateToProps, null)(RoutesX);
