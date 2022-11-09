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
  useLocation,
  useParams,
} from 'react-router-dom';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import GitHubIcon from '@mui/icons-material/GitHub';
import Moment from 'react-moment';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';
import { fetchCoinInfoAction } from '../actions/coinInfo';
import Discord from '../assets/images/discord.svg';
import Telegram from '../assets/images/telegram.svg';
import { fetchCurrenciesAction } from '../actions/currencies';

import { withRouter } from '../hooks/withRouter';

function RenderCoinInfo(props) {
  const {
    images,
    coin,
    currencies,
  } = props;
  const image = images(`./${coin.ticker}.png`);
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        justifyContent="center"
        align="center"
      >
        <img
          src={image}
          className="coinImage"
          alt={`${coin.ticker} logo`}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h6"
          gutterBottom
          align="center"
        >
          {coin.ticker}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h6"
          gutterBottom
          align="center"
        >
          {coin.coinInfo.name}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h6"
          gutterBottom
          align="center"
        >
          {coin.coinInfo.website}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h6"
          gutterBottom
          align="center"
        >
          {coin.coinInfo.description}
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={6}
        className="mt-1 mb-1"
        alignItems="center"
        justifyContent="center"
      >
        <a
          href={coin.coinInfo.explorer}
          style={{ textAlign: 'center' }}
        >
          <TravelExploreIcon
            className="tipBotLinkLogo mb-1"
          />
          <Typography
            variant="subtitle1"
            align="center"
          >
            <Trans>View</Trans>
            {' '}
            {coin.coinInfo.name}
            {' '}
            Explorer
          </Typography>
        </a>
      </Grid>
      <Grid
        container
        item
        xs={6}
        className="mt-1 mb-1"
        alignItems="center"
        justifyContent="center"
      >
        <a
          href={coin.coinInfo.github}
          style={{ textAlign: 'center' }}
        >
          <GitHubIcon
            className="tipBotLinkLogo mb-1"
          />
          <Typography
            variant="subtitle1"
            align="center"
          >
            <Trans>View</Trans>
            {' '}
            {coin.coinInfo.name}
            {' '}
            Github
          </Typography>
        </a>
      </Grid>
      <Grid
        container
        item
        xs={6}
        className="mt-1 mb-1"
        alignItems="center"
        justifyContent="center"
      >
        <a
          href={coin.coinInfo.discord}
          style={{ textAlign: 'center' }}
        >
          <Discord
            className="tipBotLinkLogo mb-1"
          />
          <Typography
            variant="subtitle1"
            align="center"
          >
            <Trans>Join</Trans>
            {' '}
            {coin.coinInfo.name}
            {' '}
            Discord Community
          </Typography>
        </a>
      </Grid>
      <Grid
        container
        item
        xs={6}
        className="mt-1 mb-1"
        alignItems="center"
        justifyContent="center"
      >
        <a
          href={coin.coinInfo.telegram}
          style={{ textAlign: 'center' }}
        >
          <Telegram
            className="tipBotLinkLogo mb-1"
          />
          <Typography
            variant="subtitle1"
            align="center"
          >
            <Trans>Join</Trans>
            {' '}
            {coin.coinInfo.name}
            {' '}
            Telegram Community
          </Typography>
        </a>
      </Grid>
      <Grid item xs={12}>
        Last updated Price:
        {' '}
        <Moment interval={1000} fromNow>{coin.updatedAt}</Moment>
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
                  Currency ISO
                </TableCell>
                <TableCell
                  style={{ fontWeight: 'bold' }}
                >
                  Conversion Rate
                </TableCell>
                <TableCell
                  style={{ fontWeight: 'bold' }}
                >
                  Price/
                  {coin.ticker}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currencies
              && currencies.length > 0
                && coin.price
                && currencies.map((currency) => (
                  <TableRow
                    key={`${currency.currency_name}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell scope="row">
                      {currency.iso}
                    </TableCell>
                    <TableCell scope="row">
                      {currency.conversionRate}
                      {' '}
                      (
                      <Moment interval={1000} fromNow>{currency.updatedAt}</Moment>
                      )
                    </TableCell>
                    <TableCell scope="row">
                      {(Number(coin.price) * Number(currency.conversionRate)).toFixed(8)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
                  {coin.ticker}
                  {' '}
                  Exchanges
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coin.coinInfo
                && coin.coinInfo.coinInfoExchanges
                && coin.coinInfo.coinInfoExchanges.map((exchange) => (
                  <TableRow
                    key={`${exchange.url}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {exchange.url}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

RenderCoinInfo.propTypes = {
  coin: PropTypes.shape({
    ticker: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    coinInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      telegram: PropTypes.string,
      discord: PropTypes.string,
      github: PropTypes.string,
      description: PropTypes.string.isRequired,
      explorer: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
      coinInfoExchanges: PropTypes.arrayOf(PropTypes.shape({
        ticker: PropTypes.string,
      })),
    }),
  }).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    updatedAt: PropTypes.string.isRequired,
    conversionRate: PropTypes.string.isRequired,
  })).isRequired,
  images: PropTypes.func.isRequired,
};

const CoinInfoView = function (props) {
  const {
    coinInfo,
    currencies,
  } = props;
  const images = require.context('../assets/images/coins', true);
  const location = useLocation();
  const dispatch = useDispatch();
  const { botName, coinTicker } = useParams();

  const [userApiUrl, setUserApiUrl] = useState(tipbotInfoArray.find((x) => x.name.toLowerCase() === botName.toLowerCase()).userApiUrl);

  useEffect(() => {
    setUserApiUrl(tipbotInfoArray.find((x) => x.name.toLowerCase() === botName.toLowerCase()).userApiUrl);
  }, [location.pathname]);

  useEffect(() => {
    if (coinTicker && userApiUrl) {
      dispatch(fetchCoinInfoAction(
        userApiUrl.toLowerCase(),
        coinTicker.toUpperCase(),
      ));
      dispatch(fetchCurrenciesAction(
        userApiUrl.toLowerCase(),
      ))
    }
  }, [
    userApiUrl,
    coinTicker,
  ]);

  useEffect(() => {
    if (coinInfo.data && coinInfo.data.ticker) {
      document.title = t`Coin Info - ${coinInfo.data.ticker}`;
    }
  }, [
    coinInfo.data,
    currencies,
  ]);

  return (
    <div className="content tipbots">
      {
        coinInfo.isLoading && (
          <Grid container>
            <Grid
              item
              xs={12}
              justifyContent="center"
              align="center"
            >
              <CircularProgress />
            </Grid>
          </Grid>
        )
      }
      {
        coinInfo
        && coinInfo.data
        && coinInfo.data.ticker
        && currencies
        && currencies.data
        && (
          <RenderCoinInfo
            coin={coinInfo.data}
            images={images}
            currencies={currencies.data}
          />
        )
      }
    </div>
  );
}

CoinInfoView.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  coinInfo: PropTypes.shape({
    data: PropTypes.shape({
      ticker: PropTypes.string.isRequired,
    }),
    error: PropTypes.shape({
      status: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    }),
    isLoading: PropTypes.bool.isRequired,
  }),
  currencies: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
    })),
    error: PropTypes.shape({
      status: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    }),
    isLoading: PropTypes.bool.isRequired,
  }),
};

CoinInfoView.defaultProps = {
  coinInfo: {
    data: undefined,
  },
  currencies: {
    data: undefined,
  },
};

const mapStateToProps = (state) => ({
  coinInfo: state.coinInfo,
  currencies: state.currencies,
})

export default withRouter(connect(mapStateToProps, null)(CoinInfoView));
