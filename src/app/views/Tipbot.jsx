import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import {
  useNavigate,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';

import { ReactComponent as Discord } from '../assets/images/discord.svg';
import { ReactComponent as Telegram } from '../assets/images/telegram.svg';

import { withRouter } from '../hooks/withRouter';

const Tipbot = function (props) {
  const {
    location: {
      pathname,
    },
  } = props;
  const [tipbotInfo, setTipBotInfo] = useState({});

  useEffect(() => {
    setTipBotInfo(tipbotInfoArray.find((x) => x.name.toLowerCase() === pathname.split('/')[2]));
  }, []);

  useEffect(() => {
    document.title = `Tipbots - ${tipbotInfo.name}`;
  }, [tipbotInfo]);

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={3}
          md={3}
        >
          <img
            src={tipbotInfo.logo}
            alt={`${tipbotInfo.coin} Logo`}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            variant="h3"
            align="center"
          >
            {tipbotInfo.name}
          </Typography>

        </Grid>

      </Grid>
    </div>
  );
}

Tipbot.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(connect(null, null)(Tipbot));
