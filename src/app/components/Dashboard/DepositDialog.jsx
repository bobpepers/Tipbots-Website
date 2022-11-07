import React, {
  useEffect,
} from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  IconButton,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import QRCode from 'qrcode';
import PropTypes from 'prop-types';

export default function DepositDialog(
  props,
) {
  const {
    wallet,
    tickerLogo,
  } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [imagePath, setImagePath] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleClickCopyAddress = () => {
    window.navigator.clipboard.writeText(wallet.address.address)
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    QRCode.toDataURL(wallet.address.address, (err, imageUrl) => {
      if (err) {
        console.log('Could not generate QR code', err);
        return;
      }
      setImagePath(imageUrl);
    });
  }, []);

  return (
    <>
      <IconButton
        color="success"
        variant="contained"
        aria-label="deposit"
        component="label"
        onClick={handleClickOpen}
        style={{
          marginLeft: '1rem',
        }}
      >
        <AddIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Deposit
          {' '}
          {wallet.coin.ticker}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
              }}
            >
              <img alt="" className="coinTickerDeposit" src={tickerLogo} />
            </div>
            <Typography variant="subtitle2" align="center">
              Deposit Address
            </Typography>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
              }}
            >
              <img
                src={imagePath}
                alt={`${wallet.coin.ticker} Deposit 2FA QR Code`}
              />
            </div>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Button variant="outlined" onClick={handleClickCopyAddress}>
                Copy address to clipboard
              </Button>
            </div>

            {copied && (
              <div>
                <Typography
                  variant="subtitle2"
                  align="center"
                  style={{ color: '#00adb5' }}
                >
                  Successfully Copied
                  {' '}
                  {wallet.coin.ticker}
                  {' '}
                  Address
                </Typography>
              </div>
            )}
            <Typography variant="subtitle2" align="center">
              {wallet.address.address}
            </Typography>
            {wallet.address.memo && (
              <div
                style={{
                  border: '1px solid black',
                }}
              >
                <Typography variant="subtitle2" align="center">
                  Your MEMO Number
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '10px',
                  }}
                >
                  {wallet.address.memo}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    color: '#c08a3e',
                  }}
                >
                  WARNING
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    color: '#c08a3e',
                  }}
                >
                  MEMO IS REQUIRED OR COINS WILL BE LOST
                </Typography>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

DepositDialog.propTypes = {
  wallet: PropTypes.shape({
    coin: PropTypes.arrayOf(PropTypes.shape({
      ticker: PropTypes.string.isRequired,
    })).isRequired,
    address: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  tickerLogo: PropTypes.string.isRequired,
};
