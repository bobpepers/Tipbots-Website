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
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { tipbotInfoArray } from '../../helpers/tipbotsInfoArray';
import { fetchHistoryAction } from '../../actions/history';
import { fetchBotInfoAction } from '../../actions/botInfo';
import HistoryTable from '../../components/Dashboard/HistoryTable';

import { withRouter } from '../../hooks/withRouter';

const HistoryDashboardView = function (props) {
  const {
    history,
    botInfo,
  } = props;
  const {
    botName,
    chatClient,
  } = useParams();
  const dispatch = useDispatch();
  const [currentTipbotConfig, setCurrentTipbotConfig] = useState(undefined);
  const [feature, setFeature] = useState('All');
  const [type, setType] = useState('All');
  const [coin, setCoin] = useState('All');
  const [coinList, setCoinList] = useState(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => {
    document.title = t`Tipbots - History`;
    setCurrentTipbotConfig(tipbotInfoArray.find((x) => x.name.toLowerCase() === botName));
  }, []);

  useEffect(
    () => {
      if (currentTipbotConfig) {
        dispatch(fetchHistoryAction(
          currentTipbotConfig.userApiUrl,
          chatClient,
          coin,
          feature,
          type,
          page * rowsPerPage,
          rowsPerPage,
        ))
      }
    },
    [
      currentTipbotConfig,
      coin,
      feature,
      type,
      page,
      rowsPerPage,
    ],
  );

  useEffect(
    () => {
      if (currentTipbotConfig) {
        dispatch(fetchBotInfoAction(currentTipbotConfig))
      }
    },
    [
      currentTipbotConfig,
    ],
  );

  useEffect(
    () => { },
    [
      history,
      botInfo,
    ],
  );
  useEffect(
    () => {
      if (botInfo.data) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in botInfo.data) {
          if (botInfo.data[key].name.toLowerCase() === botName) {
            setCoinList(botInfo.data[key].coins);
          }
        }
      }
    },
    [
      botInfo,
    ],
  );

  useEffect(() => { }, [coinList]);

  const handleChangeCoin = (e) => {
    setCoin(e.target.value);
  }
  const handleChangeFeature = (e) => {
    setFeature(e.target.value);
  }
  const handleChangeType = (e) => {
    setType(e.target.value);
  }

  return (
    <div className="content">
      <Grid
        container
      >
        <Grid
          item
          xs={12}
          className="mt-1 mb-1"
        >
          <Typography
            variant="h3"
            align="center"
          >
            {currentTipbotConfig && currentTipbotConfig.name}
            {' '}
            <Trans>
              History
            </Trans>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="coin-select-label">Coin</InputLabel>
            <Select
              labelId="coin-select-label"
              id="coin-select"
              value={coin}
              label="Coin"
              onChange={handleChangeCoin}
            >
              <MenuItem value="All">All</MenuItem>
              [
              {coinList
              && coinList.map((x) => (
                <MenuItem key={x.ticker} value={x.ticker}>{x.ticker}</MenuItem>
              ))}
              ]
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="feature-select-label">Feature</InputLabel>
            <Select
              labelId="feature-select-label"
              id="feature-select"
              value={feature}
              label="Feature"
              onChange={handleChangeFeature}
            >
              <MenuItem key="feature-all" value="All">All</MenuItem>
              {
                chatClient === 'discord' && [
                  <MenuItem key="feature-tip" value="tip">Tip</MenuItem>,
                  <MenuItem key="feature-reactdrop" value="reactdrop">Reactdrop</MenuItem>,
                  <MenuItem key="feature-trivia" value="trivia">Trivia</MenuItem>,
                  <MenuItem key="feature-flood" value="flood">Flood</MenuItem>,
                  <MenuItem key="feature-rain" value="rain">Rain</MenuItem>,
                  <MenuItem key="feature-hurricane" value="hurricane">Hurricane</MenuItem>,
                  <MenuItem key="feature-sleet" value="sleet">Sleet</MenuItem>,
                  <MenuItem key="feature-soak" value="soak">Soak</MenuItem>,
                  <MenuItem key="feature-thunder" value="thunder">Thunder</MenuItem>,
                  <MenuItem key="feature-thunderstorm" value="thunderstorm">Thunderstorm</MenuItem>,
                  <MenuItem key="feature-voicerain" value="voicerain">Voicerain</MenuItem>,
                  <MenuItem key="feature-withdraw" value="withdraw">Withdraw</MenuItem>,
                  <MenuItem key="feature-deposit" value="deposit">Deposit</MenuItem>,
                ]
              }
              {
                chatClient === 'telegram' && [
                  <MenuItem key="feature-tip" value="tip">Tip</MenuItem>,
                  <MenuItem key="feature-flood" value="flood">Flood</MenuItem>,
                  <MenuItem key="feature-rain" value="rain">Rain</MenuItem>,
                  <MenuItem key="feature-sleet" value="sleet">Sleet</MenuItem>,
                  <MenuItem key="feature-withdraw" value="withdraw">Withdraw</MenuItem>,
                  <MenuItem key="feature-deposit" value="deposit">Deposit</MenuItem>,
                ]
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={type}
              label="Type"
              onChange={handleChangeType}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="received">Received</MenuItem>
              <MenuItem value="sent">Sent</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {
            history && history.isLoading
              ? (<CircularProgress />)
              : (
                <HistoryTable
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={history && history.count ? history.count : 0}
                  history={history
                    && history.data
                    ? history.data
                    : []}
                />
              )
          }

        </Grid>
      </Grid>
    </div>
  );
}

HistoryDashboardView.defaultProps = {
  history: {
    data: undefined,
  },
};

HistoryDashboardView.propTypes = {
  botInfo: PropTypes.shape({
    data: PropTypes.shape({
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
    })),
  }),
};

const mapStateToProps = (state) => ({
  history: state.history,
  botInfo: state.botInfo,
})

export default withRouter(connect(mapStateToProps, null)(HistoryDashboardView));
