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
import BigNumber from 'bignumber.js'
import {
  useNavigate,
} from 'react-router-dom';
import DepositDialog from './DepositDialog'

const TipBotWalletComponent = function (props) {
  const {
    tipbotWallet,
  } = props;

  const images = require.context('../../assets/images/coins', true);
  const navigate = useNavigate();

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
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{
            marginTop: '1rem',
          }}
        >
          <Grid
            item
            xs={12}
            align="center"
          >
            {tipbotWallet
            && tipbotWallet.wallets
            && tipbotWallet.wallets.map((myWallet) => {
              const image = images(`./${myWallet.coin.ticker}.png`);
              return (
                <Button
                  variant="outlined"
                  key={`${tipbotWallet.name}-${myWallet.coin.ticker}`}
                  onClick={() => navigate(`/tipbots/${tipbotWallet.name.toLowerCase()}/coin/${myWallet.coin.ticker}`)}
                  style={{
                    marginLeft: '0.2rem',
                    marginRight: '0.2rem',
                  }}
                >
                  <img alt="" className="coinTickerThumb" src={image} />
                  {myWallet.coin.ticker}
                </Button>
              )
            })}
          </Grid>
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
                          (≈$
                          {new BigNumber(wallet.available).dividedBy(`1e${wallet.coin.dp}`).times(wallet.coin.price).dp(4)
                            .toString()}
                          )
                        </TableCell>
                        <TableCell align="right">
                          <img alt="" className="coinTickerThumb" src={image} />
                          {new BigNumber(wallet.locked).dividedBy(`1e${wallet.coin.dp}`).toString() }
                          {' '}
                          (≈$
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
};

export default TipBotWalletComponent;
