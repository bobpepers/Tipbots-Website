import React, {
  useEffect,
} from 'react';
import {
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { Trans } from '@lingui/macro';
import UptimeRobot from '../components/Uptimerobot';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';

const monitorIds = tipbotInfoArray.map((a) => a.uptimeRobotMonitorId);

function Uptime() {
  useEffect(() => { }, []);

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
        >
          <Typography
            variant="h3"
            align="center"
          >
            <Trans>Uptime Monitor</Trans>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
        >
          <UptimeRobot
            apikey="ur1719256-ba1375b28cf44c17640ac06e"
            CountDays={60}
            ShowLink
            WhichTipBots={monitorIds.join('-')}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            style={{
              fontSize: '14px',
              fontWeight: 200,
              marginRight: '10px',
            }}
            size="large"
            onClick={() => window.open('https://stats.uptimerobot.com/klo5QskN2k', '_blank')}
            aria-controls="basic-menu"
            aria-haspopup="true"
            className="headerMenuTextColor"
          >
            <Trans>View monitor on</Trans>
            {' '}
            UptimeRobot
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Uptime;
