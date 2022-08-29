import React, {
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
} from '@mui/material';
import { Trans } from '@lingui/macro';
import Discord from '../assets/images/discord.svg';
import { withRouter } from '../hooks/withRouter';
import SupportForm from '../components/SupportForm';

const Support = function () {
  useEffect(() => {
    document.title = 'Tipbots - Support';
  }, []);

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
          xs={12}
          className="mt-1 mb-1"
        >
          <Typography
            variant="h3"
            align="center"
          >
            <Trans>Support</Trans>
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          className="mt-1 mb-1"
        >
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              We offer extensive tipbot support in the Runebase Discord community server.
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              Prefered way to request support is by opening a ticket with the "Ticket Tool" that you find in the Discord community server
            </Trans>
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          alignItems="center"
          justifyContent="center"
          className="mt-1 mb-1"
        >
          <a
            href="https://discord.gg/CdUSaVfp8Q"
            style={{ textAlign: 'center' }}
          >
            <Discord
              className="tipBotLinkLogo mb-1"
            />
            <Typography
              variant="subtitle1"
              align="center"
            >
              <Trans>Join Discord Support Server</Trans>
            </Typography>
          </a>

        </Grid>

        <Grid
          item
          xs={12}
          className="mt-1 mb-1"
        >
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              Alternatively you can fill out the form below.
            </Trans>
          </Typography>
          <Typography
            variant="body1"
            align="center"
          >
            <Trans>
              Please note: Using form to contact support has a significant longer wait-time then using the Ticket Tool
            </Trans>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SupportForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(connect(null, null)(Support));
