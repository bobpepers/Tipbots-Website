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
    document.title = `${tipbotInfo.name} - Privacy Policy`;
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
          container
          item
          xs={3}
          md={3}
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={tipbotInfo.logo}
            alt={`${tipbotInfo.coin} Logo`}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className="pb-1"
        >
          <Typography
            variant="h3"
            align="center"
          >
            {tipbotInfo.name}
          </Typography>
          <Typography
            variant="h3"
            align="center"
          >
            <Trans>
              Privacy Policy
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="pb-1"
        >
          <Typography
            variant="h6"
            align="left"
          >
            <Trans>
              1. Introduction
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              This Privacy Policy (“Privacy Policy“) apply to the use of the service (“Service“, “Bot“) provided by
              {' '}
              {tipbotInfo.name}
              {' '}
              (hereinafter also referred as “we” or “us”).
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              If you have any questions or comments about this Privacy Policy,
              {' '}
              please contact
              {' '}
              {tipbotInfo.name}
              {' '}
              support or the developer through discord
            </Trans>
            : Bago#7842
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              We are committed to protecting and respecting your privacy.
              {' '}
              The Privacy Policy explains the basis on which personal information we collect from you will be processed by us or on our behalf.
              {' '}
              Where we decide the purpose or means for which personal data you supply through these Services is processed, we are the “controller”.
              {' '}
              Where you decide the purpose or means for which personal data you supply through these Services is processed, you are the “controller”.
              {' '}
              We will comply with proper and applicable data protection laws.
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              We encourage you to read this Privacy Policy carefully as it contains important information about the following:
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              What information we may collect about you; How we will use the information we collect about you;
              {' '}
              Whether we will disclose your details to anyone else;
              {' '}
              And your choices and rights regarding the personal information you have provided to us.
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              The Services may contain links to services owned and operated by third parties. (BlockExplorer, Coin Project Website, Advertisement, ...)
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              We do NOT provide third-parties any personal data.
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              We may make changes to this Privacy Policy in the future.
              {' '}
              You should check this page from time to time to ensure you are aware of any changes.
              {' '}
              Where appropriate we may notify you of such changes.
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="pb-1"
        >
          <Typography
            variant="h6"
            align="left"
          >
            <Trans>
              2. Information we may collect about you
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              We collect and process the following information which may include your personal data.
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              Your Discord ID, Discord Username, Discord Server ID & Name, Discord Channel ID & Name, your user preferences as well as all the data you supply to us and information provided by you when using the Service
              {' '}
              (
              {tipbotInfo.name}
              ).
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              We do not access or store emails or phone numbers for our Discord bot users.
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="pb-1"
        >
          <Typography
            variant="h6"
            align="left"
          >
            <Trans>
              3. Collecting, processing and using personal data
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              We only store and process your personal data when you have voluntarily supplied us with it such as adding
              {' '}
              {tipbotInfo.name}
              {' '}
              on your server or by interacting with
              {' '}
              {tipbotInfo.name}
              .
              {' '}
              Your personal data will only be disclosed or otherwise transmitted if this is necessary to implement the contract, render our Services or you have given your prior consent.
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="pb-1"
        >
          <Typography
            variant="h6"
            align="left"
          >
            <Trans>
              4. Why we collect information about you (purpose of processing)
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              We will use information about you for delivering our Services to you under the terms of use agreed between us. The processing of information in this way is necessary for us to provide you the Service properly and to ensure the features function properly so that you have the best Service possible.
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="pb-1"
        >
          <Typography
            variant="h6"
            align="left"
          >
            <Trans>
              5. Log files
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              During every interaction with the Service, user data is store in a database and protocol files, the so-called log files. The datasets stored here may contain such data as date and time of the interaction, ID and username of the interacting user, the command used, ID and name of the Discord Server in which the interaction took place as well as the ID and name of the Discord Channel the interaction took place in.
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="pb-1"
        >
          <Typography
            variant="h6"
            align="left"
          >
            <Trans>
              6. Data sharing
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              We do NOT sell your personal data and we don’t provide it to anyone outside our organisation for any other purpose than the Service you subscribed for.
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              Personnel: We keep your information confidential, but may disclose it to our personnel insofar as it is reasonably necessary for the purposes set out in this Privacy Policy. However, this is on the basis that they do not make independent use of the information, and have agreed to safeguard it.
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              Required by law: In addition, we may disclose your information to the extent that we are required to do so by law (which may include to government bodies and law enforcement agencies); in connection with any legal proceedings or prospective legal proceedings; and in order to establish, exercise or defend our legal rights.
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="pb-1"
        >
          <Typography
            variant="h6"
            align="left"
          >
            <Trans>
              7. Your rights
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              You have the following rights over the way your personal data are processed.
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              To make a request, please let contact support or the developer on discord: Bago#7842
            </Trans>
          </Typography>

          <Typography
            variant="body1"
            align="left"
          >
            <Trans>
              You have the right to request a copy of the personal information we process about you and to have any inaccuracies corrected. You can ask us to restrict, stop processing personal data.
            </Trans>
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
