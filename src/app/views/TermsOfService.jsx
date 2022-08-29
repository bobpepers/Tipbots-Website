import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Trans,
  t,
} from '@lingui/macro';
import { connect } from 'react-redux';
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';

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
    document.title = t`${tipbotInfo.name} - Terms of Service`;
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
          xs={6}
          md={3}
          alignItems="center"
          justifyContent="center"
          className="mb-1 mt-1"
        >
          <img
            className="tipbotLogo"
            src={tipbotInfo.logo}
            alt={`${tipbotInfo.coin} Logo`}
          />
        </Grid>
        <Grid
          item
          xs={12}
          className="mb-1"
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
              Terms of Service
            </Trans>
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          className="mb-1"
        >
          <Typography
            variant="h6"
            align="center"
          >
            {tipbotInfo.name}
            {' '}
            <Trans>
              is beta software
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              {'In no event shall '}
              {tipbotInfo.name}
              {`${' '}or its authors be responsible for any lost, misdirected or stolen funds.`}
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="mb-1"
        >
          <Typography
            variant="h6"
            align="center"
          >
            {tipbotInfo.name}
            <Trans>
              {`${' '}Tips are non-reversible and non-refundable.`}
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              {'We don\'t reverse or refund any tips that made by the user. Please check twice before making any tips.'}
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="mb-1"
        >
          <Typography
            variant="h6"
            align="center"
          >
            {tipbotInfo.name}
            &apos;s
            {' '}
            <Trans>
              security
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              {'Your tipbot wallet security is as safe as your Discord account is. Use features like two-factor authentication to keep your account secure. In regards to '}
              {tipbotInfo.name}
              &apos;s
              {`${' '}security, we hold up to industry standards. Your wallet is powered by proven technology. In case of concerns, please contact our support.`}
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="mb-1"
        >
          <Typography
            variant="h6"
            align="center"
          >
            <Trans>
              Abuse
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              If you are found abusing any systems, your funds will be frozen and seized. We reserve the right to freeze suspicious accounts as well, until proven innocent.
            </Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className="mb-1"
        >
          <Typography
            variant="h6"
            align="center"
          >
            <Trans>
              {'Always keep small sums of coins in your '}
              {tipbotInfo.name}
              &apos;s
              {`${' '}wallet`}
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              Even if we keep up with industry standards in terms of security practices, we ask you to not keep huge sums on the bot. Please keep them in a non-custodial wallet.
            </Trans>
          </Typography>
        </Grid>
        <Divider
          style={{
            width: '100%',
          }}
          className="mb-1"
        />
        <Grid
          item
          xs={12}
          className="mb-1"
        >
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              We reserve the right to change or modify any of the terms and conditions contained in the ToS, at any time and in our sole discretion. Any changes or modifications will be effective immediately
            </Trans>
          </Typography>
        </Grid>
        <Divider
          style={{
            width: '100%',
          }}
          className="mb-1"
        />

        <Grid
          item
          xs={12}
          className="mb-1"
        >
          <Typography
            variant="h6"
            align="center"
          >
            <Trans>
              {'When using '}
              {tipbotInfo.name}
              ,  you agree to the terms and conditions above.
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
