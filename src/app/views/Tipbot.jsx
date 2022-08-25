import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import {
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';
import UptimeRobot from '../components/uptimerobot';
import { ReactComponent as Discord } from '../assets/images/discord.svg';
import { ReactComponent as Telegram } from '../assets/images/telegram.svg';

import { withRouter } from '../hooks/withRouter';

const Tipbot = function (props) {
  const location = useLocation();

  const [tipbotInfo, setTipBotInfo] = useState(tipbotInfoArray.find((x) => x.name.toLowerCase() === location.pathname.split('/')[2]));

  useEffect(() => {
    setTipBotInfo(tipbotInfoArray.find((x) => x.name.toLowerCase() === location.pathname.split('/')[2]));
  }, [location.pathname]);

  useEffect(() => {
    document.title = `Tipbots - ${tipbotInfo.name}`;
  }, [tipbotInfo]);

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={3}
          md={3}
        >
          <img
            src={tipbotInfo.logo}
            alt={`${tipbotInfo.coin} Logo`}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            variant="h3"
            align="center"
          >
            {tipbotInfo.name}
          </Typography>

        </Grid>

        <Grid
          item
          xs={12}
        >
          <UptimeRobot
            apikey="ur1719256-ba1375b28cf44c17640ac06e"
            CountDays={60}
            ShowLink
            WhichTipBots={tipbotInfo.uptimeRobotMonitorId}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Tipbot.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(connect(null, null)(Tipbot));
