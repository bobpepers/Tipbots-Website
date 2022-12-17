import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Trans,
  t,
} from '@lingui/macro';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
  Divider,
  Typography,
  Button,
} from '@mui/material';
import BigNumber from 'bignumber.js'
import {
  fetchDiscordUserBalanceAction,
} from '../../actions/discordUserBalance';
import {
  fetchDiscordUserAction,
  revokeDiscordTokenAction,
  loginDiscordAction,
} from '../../actions/discordUser';
import { tipbotInfoArray } from '../../helpers/tipbotsInfoArray';
import Discord from '../../assets/images/discord.svg';

import { withRouter } from '../../hooks/withRouter';
import TipBotWalletComponent from '../../components/Dashboard/TipbotWallet';

const DiscordDashboardView = function (props) {
  const {
    discordUser,
    discordUserBalance,
  } = props;
  const dispatch = useDispatch();
  const [estimatedTotal, setEstimatedTotal] = useState('0')
  useEffect(() => {
    document.title = t`Tipbots - Discord Dashboard`;
  }, []);

  useEffect(
    () => {
      dispatch(fetchDiscordUserAction())
    },
    [],
  );

  useEffect(
    () => {
      if (discordUser && discordUser.data) {
        tipbotInfoArray.forEach((tipbot) => {
          dispatch(fetchDiscordUserBalanceAction(tipbot))
        });
      }
    },
    [
      discordUser,
    ],
  );

  useEffect(
    () => {
      let totalAverage = new BigNumber(0);
      if (
        discordUserBalance
        && discordUserBalance.data
        && Object.keys(discordUserBalance.data).length > 0
      ) {
        Object.keys(discordUserBalance.data).forEach((key) => {
          if (discordUserBalance.data[key].wallets) {
            discordUserBalance.data[key].wallets.map((o) => {
              const estimatedAvailable = new BigNumber(o.available).dividedBy(`1e${o.coin.dp}`).times(o.coin.price).dp(8);
              const estimatedLocked = new BigNumber(o.locked).dividedBy(`1e${o.coin.dp}`).times(o.coin.price).dp(8);
              totalAverage = totalAverage.plus(estimatedAvailable).plus(estimatedLocked);
              return o;
            });
          }
        });
      }
      setEstimatedTotal(totalAverage.toString());
    },
    [
      discordUserBalance,
    ],
  );

  useEffect(
    () => {
      console.log(discordUserBalance);
    },
    [
      discordUser,
      discordUserBalance,
    ],
  );

  return (
    <div className="content">
      {discordUser
      && discordUser.data
        ? (
          <Grid
            container
            style={{
              marginTop: '10px',
            }}
          >
            <Grid
              container
              item
              xs={4}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <div>
                <img
                  src={`https://cdn.discordapp.com/avatars/${discordUser.data.id}/${discordUser.data.avatar}.png`}
                  alt="User Profile Picture"
                  aria-hidden
                />
              </div>
              <Typography
                variant="body1"
                align="center"
                style={{
                  display: 'inline-block',
                }}
              >
                {discordUser.data.username}
                #
                {discordUser.data.discriminator}
              </Typography>
              <Button
                variant="contained"
                color="success"
                fullWidth
                size="large"
                onClick={() => dispatch(revokeDiscordTokenAction())}
              >
                <Trans>
                  Logout
                </Trans>
              </Button>
            </Grid>
            <Grid
              container
              item
              xs={8}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="body1"
                align="center"
              >
                Your Estimated Value: $
                {estimatedTotal}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              container
              item
              xs={12}
              sm="auto"
              md="auto"
              alignContent="center"
              alignItems="center"
              justifyContent="center"
            >
              <Discord
                className="tipBotLinkLogo mb-1"
                onClick={() => dispatch(loginDiscordAction())}
                style={{
                  paddingTop: '1rem',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="discord"
                fullWidth
                size="large"
                onClick={() => dispatch(loginDiscordAction())}
              >
                <Trans>
                  Login Through Discord
                </Trans>
              </Button>
            </Grid>
          </Grid>
        )}
      <Divider
        style={{
          width: '100%',
          marginBottom: '2rem',
        }}
      />
      <Grid
        container
        spacing={4}
      >
        {
          discordUserBalance
          && discordUserBalance.data
          && Object.keys(discordUserBalance.data).length > 0
          && Object.keys(discordUserBalance.data).map((key) => (
            <TipBotWalletComponent
              key={`tipbotWallet-${discordUserBalance.data[key].name}`}
              tipbotWallet={discordUserBalance.data[key]}
            />
          ))
        }
      </Grid>
    </div>
  );
}

DiscordDashboardView.propTypes = {
  discordUserBalance: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string,
      wallets: PropTypes.arrayOf(PropTypes.shape({
      })),
    }),
  }).isRequired,
  discordUser: PropTypes.shape({
    data: PropTypes.shape({
      username: PropTypes.string.isRequired,
      discriminator: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  discordUser: state.discordUser,
  discordUserBalance: state.discordUserBalance,
})

export default withRouter(connect(mapStateToProps, null)(DiscordDashboardView));
