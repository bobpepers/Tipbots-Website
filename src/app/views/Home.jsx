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
} from '@mui/material';
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
            <Trans>Personalized Tipbots</Trans>
          </Typography>

        </Grid>
        <Divider
          style={{
            width: '100%',
            marginBottom: '2rem',
          }}
        />
        <Grid
          item
          xs={12}
          md={6}
        >
          <Typography
            variant="body1"
            align="left"
          >
            <img src={FloodExample} alt="runestip flood example" />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Typography
            variant="body1"
            align="left"
            gutterBottom
          >
            <Trans>Personalized Discord and Telegram tipbots for crypto projects.</Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
            gutterBottom
          >
            <Trans>
              Top quality personalized tipbots for bitcoin forks, zcash forks, komodo smartchains with dedicated developer and support.
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
            gutterBottom
          >
            <Trans>
              A wide range of features.
            </Trans>
          </Typography>

        </Grid>

        <Divider
          style={{
            width: '100%',
            marginTop: '2rem',
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
