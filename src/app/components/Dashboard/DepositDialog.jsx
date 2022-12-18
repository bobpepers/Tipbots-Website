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
  Box,
  InputAdornment,
  InputLabel,
  FormControl,
  FilledInput,
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
import DoneIcon from '@mui/icons-material/Done';

const secretEnv = process.env.ENV === 'development' ? 'pulsar-2' : 'secret-4';
const secretLCD = process.env.ENV === 'development' ? 'https://lcd.testnet.secretsaturn.net' : 'https://lcd-secret.keplr.app';
const secretRPC = process.env.ENV === 'development' ? 'https://rpc.testnet.secretsaturn.net' : 'https://rpc-secret.keplr.app';
const secretChainName = process.env.ENV === 'development' ? 'Secret Testnet' : 'Secret Network';
const secretTxExplorer = process.env.ENV === 'development' ? 'https://testnet.ping.pub/secret/tx/' : 'https://ping.pub/secret/tx/';

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
  const [keplrBalance, setKeplrBalance] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState('');
  const [isBroadcastingKeplrTx, setIsBroadcastingKeplrTx] = useState(false);
  const [keplrTxData, setKeplrTxData] = useState(undefined);
  const [depositAmountEstValue, setDepositAmountEstValue] = useState(undefined);

  useEffect(() => {
    setKeplrTxData(undefined);
    setKeplrBalance(undefined);
    setDepositAmount('');
  }, [
    open,
  ]);

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
        await window.keplr.experimentalSuggestChain({
          chainId: secretEnv,
          chainName: secretChainName,
          rpc: secretRPC,
          rest: secretLCD,
          bip44: {
            coinType: 529,
          },
          coinType: 529,
          stakeCurrency: {
            coinDenom: 'SCRT',
            coinMinimalDenom: 'uscrt',
            coinDecimals: 6,
          },
          bech32Config: {
            bech32PrefixAccAddr: 'secret',
            bech32PrefixAccPub: 'secretpub',
            bech32PrefixValAddr: 'secretvaloper',
            bech32PrefixValPub: 'secretvaloperpub',
            bech32PrefixConsAddr: 'secretvalcons',
            bech32PrefixConsPub: 'secretvalconspub',
          },
          currencies: [
            {
              coinDenom: 'SCRT',
              coinMinimalDenom: 'uscrt',
              coinDecimals: 6,
            },
          ],
          feeCurrencies: [
            {
              coinDenom: 'SCRT',
              coinMinimalDenom: 'uscrt',
              coinDecimals: 6,
            },
          ],
          gasPriceStep: {
            low: 0.1,
            average: 0.25,
            high: 0.4,
          },
          features: ['secretwasm'],
        });
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
        url: secretLCD,
        chainId: secretEnv,
        wallet: offlineSigner,
        walletAddress: keplrAccounts[0].address,
        encryptionUtils: window.getEnigmaUtils(secretEnv),
      }));
    }
  }, [
    keplrAccounts,
  ]);

  const fetchKeplrBalance = async (coin) => {
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
      try {
        await window.keplr.suggestToken(secretEnv, coin.tokenId);
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
      } catch (e) {
        setKeplrBalance(undefined);
      }
    }
  }

  useEffect(() => {
    if (secretJs) {
      fetchKeplrBalance(wallet.coin);
    }
  }, [
    secretJs,
    keplrTxData,
  ]);

  const setViewingKey = async () => {
    await window.keplr.suggestToken(secretEnv, wallet.coin.tokenId);
    fetchKeplrBalance(wallet.coin);
  }

  useEffect(() => {
    // console.log(keplrBalance);
    // console.log(depositAmount);
  }, [
    keplrBalance,
    depositAmount,
    depositAmountEstValue,
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
    if (!value || value === '') {
      setDepositAmountEstValue(undefined);
    }
    if (value < 0 && value) {
      setDepositAmount('');
      setDepositAmountEstValue(undefined);
      return;
    }
    if (value > keplrBalance.toNumber()) {
      setDepositAmount(keplrBalance.toNumber());
      setDepositAmountEstValue(new BigNumber(keplrBalance.toNumber()).times(wallet.coin.price).dp(4)
        .toString());
      return;
    }
    setDepositAmountEstValue(new BigNumber(value).times(wallet.coin.price).dp(4)
      .toString());
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
        <DialogContent
          className="depositDialogContent"
        >
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
                        {
                          !keplrBalance ? (
                            <>
                              🚫
                              <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={() => setViewingKey()}
                              >
                                Set viewing key
                              </Button>
                            </>

                          ) : (
                            <Typography
                              variant="subtitle2"
                              align="center"
                            >
                              <Box sx={{ fontWeight: 'bold', m: 1 }}>
                                {new Intl.NumberFormat('en-US', {}).format(keplrBalance)}
                                {' '}
                                {wallet.coin.ticker}
                              </Box>

                              (≈$
                              {new BigNumber(keplrBalance).times(wallet.coin.price).dp(4)
                                .toString()}
                              )
                            </Typography>
                          )
                        }

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
                        <>
                          <Grid
                            item
                            xs={12}
                            align="center"
                            alignContent="center"
                            justifyContent="center"
                          >
                            <DoneIcon
                              style={{
                                color: '#00B200',
                                fontSize: '60px',
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle2"
                              align="center"
                              sx={{
                                color: '#00B200',
                              }}
                            >
                              Transaction Success!
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              align="center"
                            >
                              Your deposit of
                              {' '}
                              <span style={{ fontWeight: 'bold' }}>
                                {depositAmount}
                                {' '}
                                {wallet.coin.ticker}
                              </span>
                              {' '}
                              will be reflected into your wallet in
                              <Box sx={{ fontWeight: 'bold' }}>
                                {' '}
                                ~100 confirmations (est. 400 seconds)
                              </Box>
                            </Typography>
                            <Typography variant="subtitle2" align="center">
                              {keplrTxData.transactionHash}
                            </Typography>
                            <Button
                              fullWidth
                              variant="contained"
                              size="large"
                              target="_blank"
                              href={`${secretTxExplorer}${keplrTxData.transactionHash}`}
                            >
                              View on explorer
                            </Button>
                          </Grid>
                        </>
                      )
                    }
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                        <FilledInput
                          id="adornment-amount"
                          type="number"
                          value={depositAmount}
                          onChange={changeDepositAmount}
                          endAdornment={(
                            <InputAdornment position="end">
                              {depositAmountEstValue && `(≈$${depositAmountEstValue})`}
                            </InputAdornment>
                          )}
                          label="Amount"
                        />
                      </FormControl>
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
