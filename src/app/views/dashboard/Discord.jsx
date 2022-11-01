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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
        Object.keys(discordUserBalance.data).forEach((key, index) => {
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
            <Grid
              item
              xs={12}
              sm={12}
              ms={6}
              lg={6}
              xl={4}
              key={`balance-${discordUserBalance.data[key].name}`}
              // style={{ border: '5px dotted black' }}
            >
              <Grid
                container
                item
                xs={12}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid
                  container
                  item
                  xs={12}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <a
                    href={discordUserBalance.data[key].discordLink}
                    style={{ textAlign: 'center' }}
                  >
                    <img
                      src={discordUserBalance.data[key].logo}
                      alt={`${discordUserBalance.data[key].name} Logo`}
                      className="tipBotLinkLogo"
                    />
                  </a>
                  {discordUserBalance.data[key].name}
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Coin</TableCell>
                          <TableCell align="right">available</TableCell>
                          <TableCell align="right">locked</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {discordUserBalance.data[key]
                        && discordUserBalance.data[key].wallets
                        && discordUserBalance.data[key].wallets.map((wallet) => (
                          <TableRow
                            key={wallet.coin.ticker}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {wallet.coin.ticker}
                            </TableCell>
                            <TableCell align="right">
                              {new BigNumber(wallet.available).dividedBy(`1e${wallet.coin.dp}`).toString()}
                              {' '}
                              (≈$
                              {new BigNumber(wallet.available).dividedBy(`1e${wallet.coin.dp}`).times(wallet.coin.price).dp(4)
                                .toString()}
                              )
                            </TableCell>
                            <TableCell align="right">
                              {new BigNumber(wallet.locked).dividedBy(`1e${wallet.coin.dp}`).toString() }
                              {' '}
                              (≈$
                              {new BigNumber(wallet.locked).dividedBy(`1e${wallet.coin.dp}`).times(wallet.coin.price).dp(4)
                                .toString()}
                              )
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

DiscordDashboardView.propTypes = {

};

const mapStateToProps = (state) => ({
  discordUser: state.discordUser,
  discordUserBalance: state.discordUserBalance,
})

export default withRouter(connect(mapStateToProps, null)(DiscordDashboardView));
