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
import { fetchTransactionHistoryAction } from '../../actions/transactionHistory';
import { fetchBotInfoAction } from '../../actions/botInfo';
import TransactionHistoryTable from '../../components/Dashboard/TransactionHistoryTable';

import { withRouter } from '../../hooks/withRouter';

const TransactionHistoryDashboardView = function (props) {
  const {
    transactionHistory,
    botInfo,
  } = props;
  const {
    botName,
    chatClient,
  } = useParams();
  const dispatch = useDispatch();
  const [currentTipbotConfig, setCurrentTipbotConfig] = useState(undefined);
  const [type, setType] = useState('All');
  const [coin, setCoin] = useState('All');
  const [coinList, setCoinList] = useState(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => {
    document.title = t`Tipbots - Transaction History`;
    setCurrentTipbotConfig(tipbotInfoArray.find((x) => x.name.toLowerCase() === botName));
  }, []);

  useEffect(
    () => {
      if (currentTipbotConfig) {
        dispatch(fetchTransactionHistoryAction(
          currentTipbotConfig.userApiUrl,
          chatClient,
          coin,
          type,
          page * rowsPerPage,
          rowsPerPage,
        ))
      }
    },
    [
      currentTipbotConfig,
      coin,
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
    () => {},
    [
      transactionHistory,
      transactionHistory.data,
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
              Transaction History
            </Trans>
          </Typography>
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
              <MenuItem value="deposit">Deposit</MenuItem>
              <MenuItem value="withdrawal">Withdrawal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {
            transactionHistory && transactionHistory.isLoading
              ? (<CircularProgress />)
              : (
                <TransactionHistoryTable
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={transactionHistory && transactionHistory.count ? transactionHistory.count : 0}
                  history={transactionHistory
                      && transactionHistory.data
                    ? transactionHistory.data
                    : []}
                />
              )
          }

        </Grid>
      </Grid>
    </div>
  );
}

TransactionHistoryDashboardView.defaultProps = {
  transactionHistory: {
    data: undefined,
  },
};

TransactionHistoryDashboardView.propTypes = {
  botInfo: PropTypes.shape({
    data: PropTypes.shape({
    }).isRequired,
  }).isRequired,
  transactionHistory: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
    })),
    count: PropTypes.number,
    isLoading: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => ({
  transactionHistory: state.transactionHistory,
  botInfo: state.botInfo,
})

export default withRouter(connect(mapStateToProps, null)(TransactionHistoryDashboardView));
