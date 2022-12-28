import React, {
  useEffect,
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
  Divider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Runebase from '../assets/images/runebaseloop.gif';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';
import { withRouter } from '../hooks/withRouter';
import { fetchBotInfoAction } from '../actions/botInfo';
import TipBotInfoComponent from '../components/TipbotInfo';

const Home = function (props) {
  const {
    botInfo,
  } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    document.title = t`Tipbots - Home`;
  }, []);

  useEffect(
    () => {},
    [
      botInfo,
    ],
  );

  useEffect(
    () => {
      tipbotInfoArray.forEach((tipbot) => {
        dispatch(fetchBotInfoAction(tipbot))
      });
    },
    [
    ],
  );

  return (
    <div className="content">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          xl={3}
        >
          <img
            src={Runebase}
            alt="Runebase Logo"
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
      >
        <Divider
          style={{
            width: '100%',
          }}
        />
        <Grid
          item
          xs={12}
        >
          <Typography
            variant="h3"
            align="center"
          >
            <Trans>
              Personalized Tipbots
            </Trans>
          </Typography>
        </Grid>
        <Divider
          style={{
            width: '100%',
            marginBottom: '2rem',
          }}
        />
      </Grid>
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          order={{
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
          }}
        >
          <Typography
            variant="body1"
            // align={lgUp ? 'left' : 'center'}
            align="center"
            gutterBottom
            className={lgUp ? 'addExampleTextMarginLeft' : ''}
          >
            <Trans>
              Personalized Discord and Telegram tipbots for crypto projects.
            </Trans>
          </Typography>
          {/* <Typography
            variant="body1"
            // align={lgUp ? 'left' : 'center'}
            align="center"
            gutterBottom
            className={lgUp ? 'addExampleTextMarginLeft' : ''}
          >
            <Trans>
              Tipbots for bitcoin forks, zcash forks, secret, komodo smartchains, stellar assets with dedicated developer and support.
            </Trans>
          </Typography> */}
          {/* <Typography
            variant="body1"
            // align={lgUp ? 'left' : 'center'}
            align="center"
            gutterBottom
            className={lgUp ? 'addExampleTextMarginLeft' : ''}
          >
            <Trans>
              A rich arsenal of features like tip, multi-tip, rain, flood, soak, sleet, voicerain, hurricane, thunderstorm, thunder, reactdrop, trivia, faucet, help, info, balance, statistics, settings,...
            </Trans>
          </Typography> */}
        </Grid>
      </Grid>
      <Divider
        style={{
          width: '100%',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      />
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        {
          botInfo
          && botInfo.data
          && Object.keys(botInfo.data).length > 0
          && Object.keys(botInfo.data).map((key) => (
            <TipBotInfoComponent
              tipbotInfo={botInfo.data[key]}
              key={key}
            />
          ))
        }
      </Grid>
    </div>
  );
}

Home.propTypes = {
  botInfo: PropTypes.shape({
    data: PropTypes.shape({
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  botInfo: state.botInfo,
})

export default withRouter(connect(mapStateToProps, null)(Home));
