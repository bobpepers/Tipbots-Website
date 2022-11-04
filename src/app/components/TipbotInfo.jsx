import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Trans,
  t,
} from '@lingui/macro';
import {
  Grid,
  Button,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Discord from '../assets/images/discord.svg';
import Telegram from '../assets/images/telegram.svg';

const TipBotInfoComponent = function (props) {
  const {
    tipbotInfo,
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
      key={`balance-${tipbotInfo.name}`}
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
            src={tipbotInfo.logo}
            alt={`${tipbotInfo.name} Logo`}
            className="tipBotLinkLogo"
          />
          {tipbotInfo.name}
          {' '}
          v
          {tipbotInfo.version}
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          {tipbotInfo
            && tipbotInfo.coins
            && tipbotInfo.coins.map((coin) => {
              import(
                `../assets/images/coins/${coin.ticker}.png`
              ).then((tickerImage) => {
                setImage((prevState) => ({ ...prevState, [coin.ticker]: tickerImage.default }));
              }).catch(() => {
                setImage((prevState) => ({ ...prevState, [coin.ticker]: null }));
              });
              return (
                <Grid
                  item
                  key={`${tipbotInfo.name}-${coin.ticker}`}
                >
                  {
                    image
                    && image[coin.ticker]
                    && <img alt="" className="coinTickerThumb" src={image[coin.ticker]} />
                  }
                  {coin.ticker}
                </Grid>
              )
            })}
        </Grid>
        <Grid
          container
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <Stack
            direction="row"
            spacing={2}
          >
            <a
              href={tipbotInfo.discordLink}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outlined"
                startIcon={(
                  <Discord
                    style={{
                      marginLeft: '15px',
                      marginRight: '15px',
                      height: '3rem',
                      width: '3rem',
                    }}
                  />
                )}
              >
                Invite
                {' '}
                {tipbotInfo.name}
                {' '}
                to Discord
              </Button>
            </a>
            <a
              href={tipbotInfo.telegramLink}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outlined"
                startIcon={(
                  <Telegram
                    style={{
                      marginLeft: '15px',
                      marginRight: '15px',
                      height: '3rem',
                      width: '3rem',
                    }}
                  />
                )}
              >
                Invite
                {' '}
                {tipbotInfo.name}
                {' '}
                to Telegram
              </Button>
            </a>
          </Stack>
        </Grid>

        <Grid
          container
          item
          xs={12}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            Feature Stats
          </Grid>
          <TableContainer>
            <Table
              aria-label="tipbotWallet table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: 'bold' }}
                  >
                    Feature
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: 'bold' }}
                    align="right"
                  >
                    Count
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tipbotInfo
                    && tipbotInfo.stats
                    && Object.entries(tipbotInfo.stats).map(([key, stat]) => (
                      <TableRow
                        key={`${tipbotInfo.name}-${key}`}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {key}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {stat.count}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}

TipBotInfoComponent.propTypes = {
  tipbotInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    telegramLink: PropTypes.string.isRequired,
    discordLink: PropTypes.string.isRequired,
    stats: PropTypes.shape({
    }).isRequired,
    coins: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
  }).isRequired,
};

export default TipBotInfoComponent;
