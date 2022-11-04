import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Trans,
  t,
} from '@lingui/macro';
import {
  Grid,
} from '@mui/material';
import BigNumber from 'bignumber.js'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TipBotWalletComponent = function (props) {
  const {
    tipbotWallet,
  } = props;

  const [image, setImage] = useState({});

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
          <a
            href={tipbotWallet.discordLink}
            style={{ textAlign: 'center' }}
          >
            <img
              src={tipbotWallet.logo}
              alt={`${tipbotWallet.name} Logo`}
              className="tipBotLinkLogo"
            />
          </a>
          {tipbotWallet.name}
          {' '}
          v
          {tipbotWallet.version}
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
                    import(
                      `../../assets/images/coins/${wallet.coin.ticker}.png`
                    ).then((tickerImage) => {
                      setImage((prevState) => ({ ...prevState, [wallet.coin.ticker]: tickerImage.default }));
                    }).catch(() => {
                      setImage((prevState) => ({ ...prevState, [wallet.coin.ticker]: null }));
                    });
                    return (
                      <TableRow
                        key={wallet.coin.ticker}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {wallet.coin.ticker}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {image && image[wallet.coin.ticker] && <img alt="" className="coinTickerThumb" src={image[wallet.coin.ticker]} />}
                          {new BigNumber(wallet.available).dividedBy(`1e${wallet.coin.dp}`).toString()}
                          {' '}
                          (≈$
                          {new BigNumber(wallet.available).dividedBy(`1e${wallet.coin.dp}`).times(wallet.coin.price).dp(4)
                            .toString()}
                          )
                        </TableCell>
                        <TableCell align="right">
                          {image && image[wallet.coin.ticker] && <img alt="" className="coinTickerThumb" src={image[wallet.coin.ticker]} />}
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

};

export default TipBotWalletComponent;
