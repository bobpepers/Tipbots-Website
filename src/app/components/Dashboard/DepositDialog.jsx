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
  TextField,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import QRCode from 'qrcode';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import {
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
  const [depositAmount, setDepositAmount] = useState('');
  const [isBroadcastingKeplrTx, setIsBroadcastingKeplrTx] = useState(false);
  const [keplrTxData, setKeplrTxData] = useState(undefined);

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
        setKeplrBalance(amountToFormat);
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
        setKeplrBalance(amountToFormat);
      }
    }
    if (secretJs) {
      fetchKeplrBalance(wallet.coin);
    }
  }, [
    secretJs,
    keplrTxData,
  ]);

  useEffect(() => {
    // console.log(keplrBalance);
    // console.log(depositAmount);
  }, [
    keplrBalance,
    depositAmount,
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

  const changeDepositAmount = (e) => {
    const { value } = e.target;
    if (value < 0 && value) {
      setDepositAmount(0);
      return;
    }
    if (value > keplrBalance.toNumber()) {
      setDepositAmount(keplrBalance.toNumber());
      return;
    }
    setDepositAmount(value);
  }

  const executeKeplrDeposit = async () => {
    setIsBroadcastingKeplrTx(true);
    setKeplrTxData(undefined);
    if (wallet.coin.type === 'native') {
      const msg = new MsgSend({
        from_address: keplrAccounts[0].address,
        to_address: wallet.address.address,
        amount: [{
          denom: 'uscrt',
          amount: new BigNumber(depositAmount).times(`1e${wallet.coin.dp}`).toString(),
        }],
      });
      try {
        const tx = await secretJs.tx.broadcast([msg], {
          gasLimit: 20000,
          gasPriceInFeeDenom: 0.1,
          // feeDenom: 'uscrt',
          memo: wallet.address.memo,
        });
        if (tx) {
          console.log(tx);
          setKeplrTxData(tx);
          setIsBroadcastingKeplrTx(false);
        }
      } catch (e) {
        setIsBroadcastingKeplrTx(false);
      }
    }
    if (wallet.coin.type === 'token') {
      try {
        const tx = await secretJs.tx.compute.executeContract({
          sender: keplrAccounts[0].address,
          contract_address: wallet.coin.tokenId,
          code_hash: wallet.coin.codeHash,
          msg: {
            transfer: {
              owner: keplrAccounts[0].address,
              recipient: wallet.address.address,
              amount: new BigNumber(depositAmount).times(`1e${wallet.coin.dp}`).toString(),
              memo: wallet.address.memo,
            },
          },
        }, {
          gasLimit: 60000,
          memo: wallet.address.memo,
        });
        if (tx) {
          console.log(tx);
          setKeplrTxData(tx);
          setIsBroadcastingKeplrTx(false);
        }
      } catch (e) {
        setIsBroadcastingKeplrTx(false);
      }
    }
  }

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
        className="tipbotWallet"
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
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <div
                        style={{
                          width: '100%',
                          textAlign: 'center',
                        }}
                      >
                        <img alt="" className="coinTickerDeposit" src={tickerLogo} />
                      </div>

                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" align="center">
                        Your Keplr balance
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        {new Intl.NumberFormat('en-US', {}).format(keplrBalance)}
                        {' '}
                        {wallet.coin.ticker}
                      </Typography>
                    </Grid>
                    {
                      isBroadcastingKeplrTx && (
                        <Grid
                          item
                          xs={12}
                          align="center"
                          alignContent="center"
                          justifyContent="center"
                        >
                          <CircularProgress />
                        </Grid>
                      )
                    }
                    {
                      keplrTxData && (
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" align="center">
                            Transaction Success!
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            {keplrTxData.transactionHash}
                          </Typography>
                        </Grid>
                      )
                    }
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        label="depositAmount"
                        variant="filled"
                        fullWidth
                        value={depositAmount}
                        onChange={changeDepositAmount}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        label="Memo"
                        variant="filled"
                        fullWidth
                        disabled
                        defaultValue={wallet.address.memo}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={() => executeKeplrDeposit()}
                        disabled={depositAmount === ''}
                      >
                        Deposit
                      </Button>
                    </Grid>
                  </Grid>
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
      tokenId: PropTypes.string,
      codeHash: PropTypes.string,
      type: PropTypes.string.isRequired,
      dp: PropTypes.number.isRequired,
    }).isRequired,
    address: PropTypes.shape({
      address: PropTypes.string.isRequired,
      memo: PropTypes.string,
    }).isRequired,
  }).isRequired,
  tickerLogo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
