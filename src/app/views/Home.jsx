import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import { connect } from 'react-redux';
import {
  Grid,
  Divider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Runebase from '../assets/images/runebaseloop.gif';
import FloodExample from '../assets/images/floodExample.gif';
import { ReactComponent as Discord } from '../assets/images/discord.svg';
import { ReactComponent as Telegram } from '../assets/images/telegram.svg';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';

import { withRouter } from '../hooks/withRouter';

const Home = function (props) {
  const {
    nodeStatus,
  } = props;
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    document.title = 'Tipbots - Home';
  }, []);

  useEffect(
    () => {
      console.log(nodeStatus);
    },
    [
      nodeStatus,
    ],
  );

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
            src={Runebase}
            alt="Runebase Logo"
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
      >
        <Divider
          style={{
            width: '100%',
          }}
        />

        <Grid
          item
          xs={12}
        >
          <Typography
            variant="h3"
            align="center"
          >
            <Trans>
              Personalized Tipbots
            </Trans>
          </Typography>

        </Grid>
        <Divider
          style={{
            width: '100%',
            marginBottom: '2rem',
          }}
        />
      </Grid>
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          order={{
            xs: 2,
            sm: 2,
            md: 2,
            lg: 1,
          }}
        >
          <Typography
            variant="body1"
            align="left"
          >
            <img
              src={FloodExample}
              alt="runestip flood example"
              className="botExampleGifs"
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          order={{
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
          }}
        >
          <Typography
            variant="body1"
            align={lgUp ? 'left' : 'center'}
            gutterBottom
            className={lgUp ? 'addExampleTextMarginLeft' : ''}
          >
            <Trans>Personalized Discord and Telegram tipbots for crypto projects.</Trans>
          </Typography>
          <Typography
            variant="body1"
            align={lgUp ? 'left' : 'center'}
            gutterBottom
            className={lgUp ? 'addExampleTextMarginLeft' : ''}
          >
            <Trans>
              Top quality personalized tipbots for bitcoin forks, zcash forks, komodo smartchains with dedicated developer and support.
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align={lgUp ? 'left' : 'center'}
            gutterBottom
            className={lgUp ? 'addExampleTextMarginLeft' : ''}
          >
            <Trans>
              A rich arsenal of features like tip, multi-tip, rain, flood, soak, sleet, voicerain, hurricane, thunderstorm, thunder, reactdrop, trivia, faucet, help, info, balance, statistics, ignoreme, support, ...
            </Trans>
          </Typography>

        </Grid>
      </Grid>
      <Divider
        style={{
          width: '100%',
          marginTop: '2rem',
        }}
      />
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
          <Grid
            container
            item
            xs={12}
            sm="auto"
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Discord
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                height: '3rem',
                width: '3rem',
              }}
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm="auto"
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h3"
              align="center"
            >
              <Trans>Discord Tipbots</Trans>

            </Typography>
          </Grid>

          <Grid
            container
            item
            xs={12}
            sm="auto"
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Discord
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                height: '3rem',
                width: '3rem',
              }}
            />
          </Grid>

        </Grid>
        <Divider
          style={{
            width: '100%',
          }}
        />
        {tipbotInfoArray.map((tipbot) => (
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            alignItems="center"
            justifyContent="center"
            className="tipBotLinkLogoContainer"
            key={`discord-${tipbot.name}`}
          >
            <a
              href={tipbot.discordLink}
              style={{ textAlign: 'center' }}
            >
              <img
                src={tipbot.logo}
                alt={`${tipbot.name} Logo`}
                className="tipBotLinkLogo"
              />
              <Typography
                variant="subtitle1"
                align="center"
              >
                <Trans>Invite</Trans>
                {' '}
                {tipbot.name}
              </Typography>
            </a>
          </Grid>
        ))}

        <Divider
          style={{
            width: '100%',
          }}
        />

        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            container
            item
            xs={12}
            sm="auto"
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Telegram
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                height: '3rem',
                width: '3rem',
              }}
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm="auto"
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h3"
              align="center"
              style={{
                display: 'inline-block',
              }}
            >
              <Trans>
                Telegram Tipbots
              </Trans>
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm="auto"
            md="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Telegram
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                height: '3rem',
                width: '3rem',
              }}
            />
          </Grid>

        </Grid>
        <Divider
          style={{
            width: '100%',
          }}
        />
        {tipbotInfoArray.map((tipbot) => (
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            alignItems="center"
            justifyContent="center"
            className="tipBotLinkLogoContainer"
            key={`telegram-${tipbot.name}`}
          >
            <a
              href={tipbot.telegramLink}
              style={{ textAlign: 'center' }}
            >
              <img
                src={tipbot.logo}
                alt={`${tipbot.name} Logo`}
                className="tipBotLinkLogo"
              />
              <Typography
                variant="subtitle1"
                align="center"
              >
                <Trans>Invite</Trans>
                {' '}
                {tipbot.name}
              </Typography>
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  nodeStatus: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  nodeStatus: state.nodeStatus,
})

export default withRouter(connect(mapStateToProps, null)(Home));
