import React from 'react';
import PropTypes from 'prop-types';
import {
  Trans,
  t,
} from '@lingui/macro';
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import {
  Link,
} from 'react-router-dom';
import DepositDialog from './DepositDialog';
import ServerManagementModal from './ServerManagement';
import UserSettingsModal from './UserSettings';

const TipBotWalletComponent = function (props) {
  const {
    tipbotWallet,
    chatClient,
    tipbotInfo,
  } = props;

  const images = require.context('../../assets/images/coins', true);

  return (
    <Grid
      item
      xs={12}
      sm={12}
      ms={6}
      lg={6}
      xl={4}
      key={`balance-${tipbotWallet.name}`}
      // style={{ border: '5px dotted black' }}
    >
      <Grid
        container
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
          <img
            src={tipbotWallet.logo}
            alt={`${tipbotWallet.name} Logo`}
            className="tipBotLinkLogo"
          />
          {tipbotWallet.name}
          {' '}
          v
          {tipbotWallet.version}
        </Grid>
        {
          tipbotWallet.myServers && tipbotWallet.myServers.length > 0 && (
            <Grid
              container
              item
              xs={6}
              sm={6}
              md={6}
              alignItems="center"
              justifyContent="center"
              style={{
                marginTop: '1rem',
              }}
            >
              <ServerManagementModal
                myServers={tipbotWallet.myServers}
                tipbotInfo={tipbotInfo}
              />
            </Grid>
          )
        }
        {
          tipbotWallet.userSettings && (
            <Grid
              container
              item
              xs={tipbotWallet.myServers && tipbotWallet.myServers.length > 0 ? 6 : 12}
              alignItems="center"
              justifyContent="center"
              style={{
                marginTop: '1rem',
              }}
            >
              <UserSettingsModal
                userSettings={tipbotWallet.userSettings}
                tipbotInfo={tipbotInfo}
                chatClient={chatClient}
              />
            </Grid>
          )
        }
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          alignItems="center"
          justifyContent="center"
          style={{
            marginTop: '1rem',
          }}
        >
          <Button
            variant="outlined"
            component={Link}
            to={{
              pathname: `/dashboard/${chatClient}/history/activity/${tipbotWallet.name.toLowerCase()}`,
            }}
          >
            Activity History
          </Button>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          alignItems="center"
          justifyContent="center"
          className="mt-1"
        >
          <Button
            variant="outlined"
            component={Link}
            to={{
              pathname: `/dashboard/${chatClient}/history/transaction/${tipbotWallet.name.toLowerCase()}`,
            }}
          >
            Transaction History
          </Button>
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
            <Table aria-label="tipbotWallet table">
              <TableHead>
                <TableRow>
                  <TableCell>Coin</TableCell>
                  <TableCell align="right">Available</TableCell>
                  <TableCell align="right">Locked</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tipbotWallet
                  && tipbotWallet.wallets
                  && tipbotWallet.wallets.map((wallet) => {
                    const image = images(`./${wallet.coin.ticker}.png`);
                    return (
                      <TableRow
                        key={wallet.coin.ticker}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {wallet.coin.ticker}
                          <DepositDialog
                            tickerLogo={image}
                            wallet={wallet}
                            name={tipbotWallet.name}
                          />
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          <img alt="" className="coinTickerThumb" src={image} />
                          {new BigNumber(wallet.available).dividedBy(`1e${wallet.coin.dp}`).toString()}
                          {' '}
                          (???$
                          {new BigNumber(wallet.available).dividedBy(`1e${wallet.coin.dp}`).times(wallet.coin.price).dp(4)
                            .toString()}
                          )
                        </TableCell>
                        <TableCell align="right">
                          <img alt="" className="coinTickerThumb" src={image} />
                          {new BigNumber(wallet.locked).dividedBy(`1e${wallet.coin.dp}`).toString() }
                          {' '}
                          (???$
                          {new BigNumber(wallet.locked).dividedBy(`1e${wallet.coin.dp}`).times(wallet.coin.price).dp(4)
                            .toString()}
                          )
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}

TipBotWalletComponent.propTypes = {
  tipbotWallet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    wallets: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
  }).isRequired,
  chatClient: PropTypes.string.isRequired,
};

export default TipBotWalletComponent;
