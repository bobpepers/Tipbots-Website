import React, {
  useEffect,
} from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toggleTheme from './helpers/toggleTheme';

import Home from './views/Home';
import Uptime from './views/Uptime';
import Tipbot from './views/Tipbot';
import PrivacyPolicy from './views/PrivacyPolicy';
import TermsOfService from './views/TermsOfService';
import Support from './views/Support';
import { tipbotInfoArray } from './helpers/tipbotsInfoArray';

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
      {tipbotInfoArray.map((tipbot) => (
        <Route
          path={`/tipbots/${tipbot.name.toLowerCase()}`}
          element={<Tipbot />}
        />
      ))}
      {tipbotInfoArray.map((tipbot) => (
        <Route
          path={`/tipbots/${tipbot.name.toLowerCase()}/terms-of-service`}
          element={<TermsOfService />}
        />
      ))}
      {tipbotInfoArray.map((tipbot) => (
        <Route
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
