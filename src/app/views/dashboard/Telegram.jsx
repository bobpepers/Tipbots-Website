import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import TelegramLoginButton from 'react-telegram-login';
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
  fetchTelegramUserBalanceAction,
} from '../../actions/telegramUserBalance';
import {
  fetchTelegramUserAction,
  revokeTelegramTokenAction,
  loginTelegramAction,
} from '../../actions/telegramUser';
import { tipbotInfoArray } from '../../helpers/tipbotsInfoArray';
import Telegram from '../../assets/images/telegram.svg';

import { withRouter } from '../../hooks/withRouter';
import TipBotWalletComponent from '../../components/Dashboard/TipbotWallet';

const TelegramDashboardView = function (props) {
  const {
    telegramUser,
    telegramUserBalance,
  } = props;
  const dispatch = useDispatch();
  const [estimatedTotal, setEstimatedTotal] = useState('0')
  useEffect(() => {
    document.title = t`Tipbots - Telegram Dashboard`;
  }, []);

  useEffect(
    () => {
      dispatch(fetchTelegramUserAction())
    },
    [],
  );

  useEffect(
    () => {
      if (telegramUser && telegramUser.data) {
        tipbotInfoArray.forEach((tipbot) => {
          dispatch(fetchTelegramUserBalanceAction(tipbot))
        });
      }
    },
    [
      telegramUser,
    ],
  );

  useEffect(
    () => {
      let totalAverage = new BigNumber(0);
      if (
        telegramUserBalance
          && telegramUserBalance.data
          && Object.keys(telegramUserBalance.data).length > 0
      ) {
        Object.keys(telegramUserBalance.data).forEach((key, index) => {
          if (telegramUserBalance.data[key].wallets) {
            telegramUserBalance.data[key].wallets.map((o) => {
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
      telegramUserBalance,
    ],
  );

  useEffect(
    () => {
      console.log(telegramUserBalance);
    },
    [
      telegramUser,
      telegramUserBalance,
    ],
  );

  return (
    <div className="content">
      {telegramUser
        && telegramUser.data
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
                  src={telegramUser.data.photo_url}
                  alt="User Profile Picture"
                  aria-hidden
                  style={{
                    height: '128px',
                  }}
                />
              </div>
              <Typography
                variant="body1"
                align="center"
                style={{
                  display: 'inline-block',
                }}
              >
                {
                  telegramUser.data.username
                    ? telegramUser.data.username
                    : `${telegramUser.data.first_name ? telegramUser.data.first_name : ''} ${telegramUser.data.last_name ? telegramUser.data.last_name : ''}`
                }
              </Typography>
              <Button
                variant="contained"
                color="success"
                fullWidth
                size="large"
                onClick={() => dispatch(revokeTelegramTokenAction())}
              >
                <Trans>
                  Logout
                </Trans>
              </Button>
            </Grid>
            <Grid
              container
              item
              xs={6}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              Your Estimated Value: $
              {estimatedTotal}
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
              alignContent="center"
              alignItems="center"
              justifyContent="center"
            >
              <Telegram
                className="tipBotLinkLogo mb-1"
                onClick={() => dispatch(loginTelegramAction())}
                style={{
                  paddingTop: '1rem',
                }}
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              alignContent="center"
              alignItems="center"
              justifyContent="center"
            >
              <TelegramLoginButton
                dataAuthUrl={
                  process.env.ENV === 'development'
                    ? 'http://devwebsite.runebase.io/api/user/telegram/callback'
                    : 'http://tip.runebase.io/api/user/telegram/callback'
                }
                botName={
                  process.env.ENV === 'development'
                    ? 'devweb_runebase_io_bot'
                    : 'runebaseBots_bot'
                }
                language="en"
                data-size="large"
                data-request-access="write"
              />
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
          telegramUserBalance
            && telegramUserBalance.data
            && Object.keys(telegramUserBalance.data).length > 0
            && Object.keys(telegramUserBalance.data).map((key) => (
              <TipBotWalletComponent
                key={`tipbotWallet-${telegramUserBalance.data[key].name}`}
                tipbotWallet={telegramUserBalance.data[key]}
              />
            ))
        }
      </Grid>
    </div>
  );
}

TelegramDashboardView.propTypes = {

};

const mapStateToProps = (state) => ({
  telegramUser: state.telegramUser,
  telegramUserBalance: state.telegramUserBalance,
})

export default withRouter(connect(mapStateToProps, null)(TelegramDashboardView));
