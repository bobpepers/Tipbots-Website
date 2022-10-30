import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Trans,
  t,
} from '@lingui/macro';
import { connect, useDispatch } from 'react-redux';
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
    () => { },
    [
      discordUser,
    ],
  );
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
    [discordUser],
  );

  useEffect(
    () => {
      let totalAverage = new BigNumber(0);
      if (discordUserBalance && discordUserBalance.data) {
        discordUserBalance.data.forEach((obj) => {
          obj.wallets.map((o) => {
            const estimatedAvailable = new BigNumber(o.available).dividedBy(`1e${o.coin.dp}`).times(o.coin.price).dp(8);
            const estimatedLocked = new BigNumber(o.locked).dividedBy(`1e${o.coin.dp}`).times(o.coin.price).dp(8);
            totalAverage = totalAverage.plus(estimatedAvailable).plus(estimatedLocked);
            return o;
          });
        });
      }
      setEstimatedTotal(totalAverage.toString());
    },
    [
      discordUserBalance,
    ],
  );

  return (
    <div className="height100 content">
      {discordUser && discordUser.data ? (
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
          spacing={0}

        >
          <Grid
            container
            item
            xs={4}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              onClick={() => dispatch(loginDiscordAction())}
            >
              <Trans>
                Login
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
          discordUserBalance && discordUserBalance.data && discordUserBalance.data.map((tipbot) => (

            <Grid
              item
              xs={4}
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
                    href={tipbot.discordLink}
                    style={{ textAlign: 'center' }}
                  >
                    <img
                      src={tipbot.logo}
                      alt={`${tipbot.name} Logo`}
                      className="tipBotLinkLogo"
                    />
                  </a>
                  {tipbot.name}
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
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Coin</TableCell>
                          <TableCell align="right">available</TableCell>
                          <TableCell align="right">locked</TableCell>
                          <TableCell align="right">total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tipbot && tipbot.wallets && tipbot.wallets.map((wallet) => (
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
                            <TableCell align="right">
                              {new BigNumber(wallet.available).plus(wallet.locked).dividedBy(`1e${wallet.coin.dp}`).toString() }
                              {' '}
                              (≈$
                              {new BigNumber(wallet.available).plus(wallet.locked).dividedBy(`1e${wallet.coin.dp}`).times(wallet.coin.price)
                                .dp(4)
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
