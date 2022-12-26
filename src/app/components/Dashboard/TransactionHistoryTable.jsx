import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import Moment from 'react-moment';

const headCells = [
  {
    id: 'date', numeric: false, disablePadding: true, label: 'date', side: 'left',
  },
  {
    id: 'type', numeric: false, disablePadding: false, label: 'type', side: 'left',
  },
  {
    id: 'tx', numeric: false, disablePadding: false, label: 'tx', side: 'left',
  },
  {
    id: 'change', numeric: true, disablePadding: false, label: 'change', side: 'right',
  },
];

function createData(
  id,
  type,
  txid,
  phase,
  confirmations,
  amount,
  coin,
  feeAmount,
  feeCoin,
  createdAt,
  memo,
  addressExternal,
  toFrom,
) {
  return {
    id,
    type,
    txid,
    phase,
    confirmations,
    amount,
    coin,
    feeAmount,
    feeCoin,
    createdAt,
    memo,
    addressExternal,
    toFrom,
  };
}

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells && headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.side === 'right' ? 'right' : 'left'}
            padding="normal"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function TransactionHistoryTable(props) {
  const {
    history,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalCount,
  } = props;
  const rows = [];
  const images = require.context('../../assets/images/coins', true);

  history.forEach((item) => {
    rows.push(
      createData(
        item.id,
        item.type,
        item.txid,
        item.phase,
        item.confirmations,
        item.amount,
        item.coin,
        item.feeAmount,
        item.feeCoin,
        item.createdAt,
        item.memo,
        item.addressExternal,
        item.to_from,
      ),
    );
  });

  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row) => {
              const isItemSelected = isSelected(row.id);
              const imageCoin = images(`./${row.coin.ticker}.png`);
              const imageFeeCoin = images(`./${row.feeCoin.ticker}.png`);

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell align="left">
                    <Moment interval={1000} fromNow>{row.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        width: '100%',
                        display: 'inline-block',
                        color: row.type === 'send'
                          ? '#a31545' // Green
                          : '#4caf50', // Red
                      }}
                    >
                      {row.type === 'send' ? 'withdrawal' : 'deposit'}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        width: '100%',
                        display: 'inline-block',
                        color: row.phase === 'confirmed'
                          ? '#4caf50' // Green
                          : '#a31545', // Red
                      }}
                    >
                      {row.phase === 'confirming' && `${row.confirmations} confirmations`}
                      {row.phase === 'confirmed' && 'confirmed'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        width: '100%',
                        display: 'inline-block',
                      }}
                    >
                      txId:
                      {' '}
                      {row.txid}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        width: '100%',
                        display: 'inline-block',
                      }}
                    >
                      {row.type === 'send' && 'toAddress: '}
                      {row.addressExternal && row.addressExternal.address ? row.addressExternal.address : row.toFrom}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        width: '100%',
                        display: 'inline-block',
                      }}
                    >
                      Amount:
                      {' '}
                      <img alt="" className="coinTickerThumb" src={imageCoin} />
                      <span
                        style={{
                          color: row.type === 'send'
                            ? '#a31545'
                            : '#4caf50',
                        }}
                      >
                        {new BigNumber(row.amount).dividedBy(`1e${row.coin.dp}`).toString()}
                        {' '}
                        {row.coin.ticker}
                      </span>
                    </Typography>
                    {
                      row.type === 'send' && (
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            width: '100%',
                            display: 'inline-block',
                            // color: '#a31545', // Red
                          }}
                        >
                          feeAmount:
                          {' '}
                          <img alt="" className="coinTickerThumb" src={imageFeeCoin} />
                          <span style={{ color: '#a31545' }}>
                            {new BigNumber(row.feeAmount).dividedBy(`1e${row.feeCoin.dp}`).toString()}
                            {' '}
                            {row.feeCoin.ticker}
                          </span>

                        </Typography>
                      )
                    }
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

TransactionHistoryTable.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default TransactionHistoryTable;
