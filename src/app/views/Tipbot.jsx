import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import {
  useLocation,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';
import UptimeRobot from '../components/Uptimerobot';
import DiscordCommands from '../components/DiscordCommands';
import TelegramCommands from '../components/TelegramCommands'
import Discord from '../assets/images/discord.svg';
import Telegram from '../assets/images/telegram.svg';

import { withRouter } from '../hooks/withRouter';

const Tipbot = function (
  props,
) {
  const location = useLocation();

  const [tipbotInfo, setTipBotInfo] = useState(tipbotInfoArray.find((x) => x.name.toLowerCase() === location.pathname.split('/')[2]));

  useEffect(() => {
    setTipBotInfo(tipbotInfoArray.find((x) => x.name.toLowerCase() === location.pathname.split('/')[2]));
  }, [location.pathname]);

  useEffect(() => {
    document.title = `Tipbots - ${tipbotInfo.name}`;
  }, [tipbotInfo]);

  return (
    <div className="height100 content tipbots">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
        >
          <img
            className="tipbotLogo"
            src={tipbotInfo.logo}
            alt={`${tipbotInfo.coin} Logo`}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className="mt-1 mb-1"
        >
          <Typography
            variant="h3"
            align="center"
          >
            {tipbotInfo.name}
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={6}
          md={6}
          alignItems="center"
          justifyContent="center"
          className="mb-1"
        >
          <Button
            component={Link}
            variant="outlined"
            style={{
              fontSize: '14px',
              fontWeight: 200,
              marginRight: '10px',
            }}
            size="large"
            to={`/tipbots/${tipbotInfo.name.toLowerCase()}/terms-of-service`}
            aria-controls="basic-menu"
            aria-haspopup="true"
            className="headerMenuTextColor"
          >
            <Trans>
              Terms of Service
            </Trans>
          </Button>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={6}
          md={6}
          alignItems="center"
          justifyContent="center"
          className="mb-1"
        >
          <Button
            component={Link}
            variant="outlined"
            style={{
              fontSize: '14px',
              fontWeight: 200,
              marginRight: '10px',
            }}
            size="large"
            to={`/tipbots/${tipbotInfo.name.toLowerCase()}/privacy-policy`}
            aria-controls="basic-menu"
            aria-haspopup="true"
            className="headerMenuTextColor"
          >
            <Trans>
              Privacy Policy
            </Trans>
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          className="mt-1"
        >
          <UptimeRobot
            apikey="ur1719256-ba1375b28cf44c17640ac06e"
            CountDays={60}
            WhichTipBots={tipbotInfo.uptimeRobotMonitorId}
          />
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          alignItems="center"
          justifyContent="center"
          className="mt-1 mb-1"
        >
          <a
            href={tipbotInfo.discordLink}
            style={{ textAlign: 'center' }}
          >
            <Discord
              className="tipBotLinkLogo mb-1"
            />
            <Typography
              variant="subtitle1"
              align="center"
            >
              <Trans>Invite</Trans>
              {' '}
              {tipbotInfo.name}
            </Typography>
          </a>

        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          className="mt-1 mb-1"
          alignItems="center"
          justifyContent="center"
        >
          <a
            href={tipbotInfo.telegramLink}
            style={{ textAlign: 'center' }}
          >
            <Telegram
              className="tipBotLinkLogo mb-1"
            />
            <Typography
              variant="subtitle1"
              align="center"
            >
              <Trans>Invite</Trans>
              {' '}
              {tipbotInfo.name}
            </Typography>
          </a>

        </Grid>

        <Grid
          item
          xs={12}
        >
          <DiscordCommands
            tipbotInfo={tipbotInfo}
          />
        </Grid>

        <Grid
          item
          xs={12}
        >
          <TelegramCommands
            tipbotInfo={tipbotInfo}
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
