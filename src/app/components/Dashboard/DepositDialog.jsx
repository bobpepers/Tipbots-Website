import React, {
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Dialog,
  DialogContent,
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
import BigNumber from 'bignumber.js';
import {
  Wallet,
  SecretNetworkClient,
  MsgSend,
} from 'secretjs';

const secretEnv = process.env.ENV === 'development' ? 'pulsar-2' : 'secret-4';
const secretRPC = process.env.ENV === 'development' ? 'https://lcd.testnet.secretsaturn.net' : 'https://scrt-lcd.agoranodes.com';

const defaultDepositContent = (
  tickerLogo,
  imagePath,
  wallet,
  handleClickCopyAddress,
  copied,
) => (
  <>
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
    <Typography
      variant="subtitle2"
      align="center"
      sx={{
        wordBreak: 'break-word',
      }}
    >
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
  </>
)

const keplrNotFoundContent = () => (
  <>
    <Typography variant="subtitle2" align="center">
      Please install Keplr
    </Typography>
    <Button
      // target="_blank"
      href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap"
    >
      Download Keplr for chrome
    </Button>
  </>
)

export default function DepositDialog(
  props,
) {
  const {
    wallet,
    tickerLogo,
    name,
  } = props;
  const [offlineSigner, setOfflineSigner] = useState(undefined);
  const [keplrAccounts, setKeplrAccounts] = useState(undefined);
  const [secretJs, setSecretJs] = useState(undefined);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [imagePath, setImagePath] = useState('');
  const [copied, setCopied] = useState(false);
  const [hasKeplr, setHasKeplr] = useState(true);
  const [keplrBalance, setKeplrBalance] = useState(0);

  const handleClickCopyAddress = () => {
    window.navigator.clipboard.writeText(wallet.address.address)
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000)
  };

  const handleClickOpen = async () => {
    if (name === 'SecretTip') {
      if (
        !window.keplr
        || !window.getOfflineSigner
        || !window.getEnigmaUtils
      ) {
        setHasKeplr(false);
      } else {
        await window.keplr.enable(secretEnv);
        const keplrOfflineSigner = await window.getOfflineSignerOnlyAmino(secretEnv);
        setOfflineSigner(keplrOfflineSigner);
      }
      setOpen(true);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    async function fetchKeplrAccounts() {
      if (offlineSigner) {
        setKeplrAccounts(await offlineSigner.getAccounts());
      }
    }
    fetchKeplrAccounts();
  }, [
    offlineSigner,
  ]);

  useEffect(() => {
    if (keplrAccounts) {
      setSecretJs(new SecretNetworkClient({
        url: secretRPC,
        chainId: secretEnv,
        wallet: offlineSigner,
        walletAddress: keplrAccounts[0].address,
        encryptionUtils: window.getEnigmaUtils(secretEnv),
      }));
    }
  }, [
    keplrAccounts,
  ]);

  useEffect(() => {
    async function fetchKeplrBalance(coin) {
      if (coin.type === 'native') {
        const {
          balance: {
            amount,
          },
        } = await secretJs.query.bank.balance(
          {
            address: keplrAccounts[0].address,
            denom: `u${coin.ticker.toLowerCase()}`,
          },
        );
        const amountToFormat = new BigNumber(amount).dividedBy(`1e${coin.dp}`)
        setKeplrBalance(new Intl.NumberFormat('en-US', {}).format(amountToFormat.toNumber()));
      }
      if (coin.type === 'token') {
        const viewingKey = await window.keplr.getSecret20ViewingKey(
          secretEnv,
          coin.tokenId,
        );
        const {
          balance: {
            amount,
          },
        } = await secretJs.query.compute.queryContract({
          contract_address: coin.tokenId,
          code_hash: coin.codeHash,
          query: {
            balance: {
              address: keplrAccounts[0].address,
              key: viewingKey,
            },
          },
        });
        const amountToFormat = new BigNumber(amount).dividedBy(`1e${coin.dp}`)
        setKeplrBalance(new Intl.NumberFormat('en-US', {}).format(amountToFormat.toNumber()));
      }
    }
    if (secretJs) {
      fetchKeplrBalance(wallet.coin);
    }
  }, [
    secretJs,
  ]);

  useEffect(() => {
    console.log(keplrBalance);
  }, [
    keplrBalance,
  ]);

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
      <Button
        color="success"
        variant="outlined"
        aria-label="deposit"
        size="small"
        onClick={handleClickOpen}
        style={{
          marginLeft: smDown ? 0 : '1rem',
          minWidth: 0,
        }}
      >
        <AddIcon />
      </Button>
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
        </DialogTitle>
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
        <DialogContent>
          {!hasKeplr && name === 'SecretTip' && keplrNotFoundContent()}
          {hasKeplr && name === 'SecretTip' && (
            <div>
              {
                !secretJs ? (
                  <Typography variant="subtitle2" align="center">
                    Waiting for keplr integration...
                  </Typography>
                ) : (
                  <Typography variant="subtitle2" align="center">
                    Your Keplr balance:
                    {' '}
                    {keplrBalance}
                    {' '}
                    {wallet.coin.ticker}
                  </Typography>
                )
              }
            </div>
          )}
          {name !== 'SecretTip' && defaultDepositContent(
            tickerLogo,
            imagePath,
            wallet,
            handleClickCopyAddress,
            copied,
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

DepositDialog.propTypes = {
  wallet: PropTypes.shape({
    coin: PropTypes.shape({
      ticker: PropTypes.string.isRequired,
    }).isRequired,
    address: PropTypes.shape({
      address: PropTypes.string.isRequired,
      memo: PropTypes.string,
    }).isRequired,
  }).isRequired,
  tickerLogo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
