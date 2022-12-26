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
    id: 'feature', numeric: false, disablePadding: false, label: 'feature', side: 'left',
  },
  {
    id: 'location', numeric: false, disablePadding: false, label: 'location', side: 'left',
  },
  {
    id: 'user', numeric: false, disablePadding: false, label: 'user', side: 'left',
  },
  {
    id: 'change', numeric: true, disablePadding: false, label: 'change', side: 'right',
  },
];

function createData(
  id,
  createdAt,
  type,
  groupName,
  channelName,
  side,
  coin,
  amount,
  balance,
  dp,
  spender,
  earner,
) {
  return {
    id,
    createdAt,
    type,
    groupName,
    channelName,
    side,
    coin,
    amount,
    balance,
    dp,
    spender,
    earner,
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

function ActivityHistoryTable(props) {
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
        item.createdAt,
        item.type,
        item.group && item.group.groupName,
        item.channel && item.channel.channelName,
        item.side,
        item.coin && item.coin.ticker,
        item.amount,
        item.balance,
        item.coin && item.coin.dp,
        item.spender && item.spender.username,
        item.earner && item.earner.username,
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
              const image = images(`./${row.coin}.png`);

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
                      }}
                    >
                      {row.type}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        width: '100%',
                        display: 'inline-block',
                        color: row.side === 'received'
                          ? '#4caf50' // Green
                          : '#a31545', // Red
                      }}
                    >
                      {row.side}
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
                      {row.groupName}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        width: '100%',
                        display: 'inline-block',
                      }}
                    >
                      {row.channelName && row.channelName}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {row.side === 'received' ? row.spender : row.earner}
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
                      <img alt="" className="coinTickerThumb" src={image} />
                      {new BigNumber(row.balance).dividedBy(`1e${row.dp}`).toString()}
                      {' '}
                      {row.coin}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        width: '100%',
                        display: 'inline-block',
                        color: row.side === 'received'
                          ? '#4caf50' // Green
                          : '#a31545', // Red
                      }}
                    >
                      {row.side === 'sent' ? '-' : '+'}
                      <img alt="" className="coinTickerThumb" src={image} />
                      {new BigNumber(row.amount).dividedBy(`1e${row.dp}`).toString()}
                      {' '}
                      {row.coin}
                    </Typography>
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

ActivityHistoryTable.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default ActivityHistoryTable;
