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
            <Trans>Example gif here</Trans>
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
            <Trans>Personalized Discord and Telegram tipbot for your crypto project.</Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
            gutterBottom
          >
            <Trans>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus ut dolor pulvinar gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque ac erat rhoncus, scelerisque libero pretium, aliquet risus. Praesent non quam ut nunc feugiat convallis. Morbi mauris orci, viverra sed mauris vel, feugiat elementum nisi. Sed accumsan est a felis gravida, a placerat eros rhoncus. Mauris a placerat metus. Nulla consectetur erat libero, vitae viverra nisi fermentum pretium. Maecenas consectetur porttitor ante, eget volutpat mi aliquet sit amet. Ut dui magna, ullamcorper at est ut, semper egestas elit. Duis quis leo ac quam aliquam tincidunt in eget massa. Cras bibendum orci non ultricies scelerisque. Nunc ac gravida nunc. Nullam eu lacus mi.
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
            gutterBottom
          >
            <Trans>
              Cras euismod augue quis orci molestie, non dignissim dolor iaculis. Curabitur dignissim sem eros, vel eleifend augue porta quis. Etiam sed urna diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque dapibus diam mi, consequat pretium arcu consequat et. Morbi congue consequat consequat. Ut a euismod leo, vitae dictum nisl. Morbi varius eget enim pulvinar gravida. Cras finibus dapibus neque in tincidunt. Curabitur condimentum ullamcorper sapien, et efficitur erat consectetur a. Sed sodales dolor ligula, nec facilisis ipsum efficitur nec. Nulla et velit eu nisi maximus vulputate hendrerit nec magna. Vivamus sit amet lectus bibendum, interdum augue eu, egestas enim. Vivamus at mi vulputate, ornare sem ac, imperdiet sem.
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
          item
          xs={12}
        >
          <Typography
            variant="h3"
            align="center"
          >
            <Discord
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                height: '3rem',
              }}
            />
            <Trans>Discord Tipbots</Trans>
            <Discord
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                height: '3rem',
              }}
            />
          </Typography>
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
          item
          xs={12}
        >
          <Typography
            variant="h3"
            align="center"
          >
            <Telegram
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                height: '3rem',
              }}
            />
            <Trans>Telegram Tipbots</Trans>
            <Telegram
              style={{
                marginLeft: '15px',
                marginRight: '15px',
                height: '3rem',
              }}
            />
          </Typography>
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
