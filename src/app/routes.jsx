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
        path="/tipbots/runestip"
        element={<Tipbot />}
      />
      <Route
        path="/tipbots/piratetip"
        element={<Tipbot />}
      />
      <Route
        path="/tipbots/tokeltip"
        element={<Tipbot />}
      />
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
