import React from 'react';
import PropTypes from 'prop-types';
import {
  Trans,
  t,
} from '@lingui/macro';
import {
  Grid,
  Button,
} from '@mui/material';
import {
  useNavigate,
} from 'react-router-dom';
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
  const navigate = useNavigate();

  const images = require.context('../assets/images/coins', true);

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
          item
          xs={12}
          sm={12}
          md={4}
          alignItems="center"
          justifyContent="center"
          className="mt-1"
        >
          <Button
            variant="outlined"
            style={{
              fontSize: '14px',
              fontWeight: 200,
            }}
            size="small"
            onClick={() => navigate(`/tipbots/${tipbotInfo.name.toLowerCase()}/changelog`)}
            aria-controls="basic-menu"
            aria-haspopup="true"
            className="headerMenuTextColor"
          >
            <Trans>
              ChangeLog
            </Trans>
          </Button>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            align="center"
          >
            {tipbotInfo
            && tipbotInfo.coins
            && tipbotInfo.coins.map((coin) => {
              const image = images(`./${coin.ticker}.png`);
              return (
                <Button
                  variant="outlined"
                  key={`${tipbotInfo.name}-${coin.ticker}`}
                  onClick={() => navigate(`/tipbots/${tipbotInfo.name.toLowerCase()}/coin/${coin.ticker}`)}
                  className="mt-1"
                  style={{
                    marginLeft: '0.2rem',
                    marginRight: '0.2rem',
                  }}
                >
                  <img alt="" className="coinTickerThumb" src={image} />
                  {coin.ticker}
                </Button>

              )
            })}
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            justifyContent="center"
            alignItems="center"
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
