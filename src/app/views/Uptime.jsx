import React, { useEffect } from 'react';
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import UptimeRobot from '../components/uptimerobot';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';

const monitorIds = tipbotInfoArray.map((a) => a.uptimeRobotMonitorId);

function Uptime() {
  useEffect(() => {
    // window.open('https://stats.uptimerobot.com/klo5QskN2k', '_blank')
    // window.location.href = 'https://stats.uptimerobot.com/klo5QskN2k';
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
        >
          <h2>Uptime</h2>
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
          item
          xs={12}
        >
          Link to UptimeRobot
        </Grid>
      </Grid>
    </div>
  );
}

export default Uptime;
