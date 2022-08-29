import React, {
  useEffect,
  useState,
} from 'react';
import ReactTooltip from 'react-tooltip';
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Trans, t } from '@lingui/macro';
import PropTypes from 'prop-types';
import {
  formatDuration,
  formatNumber,
} from '../helpers/utils';
import { GetMonitors } from '../helpers/uptimerobot';

function UptimeRobot({
  apikey,
  CountDays,
  WhichTipBots,
}) {
  const status = {
    ok: t`Ok`,
    down: t`Down`,
    unknown: t`Unknown`,
  };

  const [monitors, setMonitors] = useState();

  useEffect(() => {
    GetMonitors(
      apikey,
      CountDays,
      WhichTipBots,
    ).then(
      setMonitors,
    );
  }, [
    apikey,
    CountDays,
    WhichTipBots,
  ]);

  if (monitors) {
    return monitors.map((site) => (
      <Grid
        container
        className="uptime"
      >
        <Grid
          item
          xs={12}
          key={site.id}
          className="site"
        >
          <div className="meta">
            <Typography variant="subtitle2">
              {site.name}
            </Typography>
            <Typography
              variant="subtitle2"
              className={`status ${site.status}`}
            >
              {
                site.status === 'ok' && (
                  <CheckIcon
                    style={{
                      color: 'green',
                    }}
                  />
                )
              }
              {
                site.status === 'down' && (
                  <CloseIcon
                    style={{
                      color: '#de484a',
                    }}
                  />
                )
              }
              {
                site.status === 'unknown' && (
                  <QuestionMarkIcon
                    style={{
                      color: '#969ea8',
                    }}
                  />
                )
              }
              {status[site.status]}
            </Typography>
          </div>
          <div className="timeline">
            {site.daily.map((data, index) => {
              let upTimeStatus = '';
              let text = `${data.date.format('DD-MM-YYYY ')}`;
              if (data.uptime >= 100) {
                upTimeStatus = 'ok';
                text += t`<br />availability: ${formatNumber(data.uptime)}%`;
              } else if (data.uptime <= 0 && data.down.times === 0) {
                upTimeStatus = 'none';
                text += t`No data`;
              } else {
                upTimeStatus = 'down';
                text += t`<br />Faulted: ${data.down.times} time<br />outage-time: ${formatDuration(data.down.duration)}<br />availability: ${formatNumber(data.uptime)}%`;
              }
              return (
                <i
                  key={index}
                  className={upTimeStatus}
                  data-tip={text}
                />
              )
            })}
          </div>
          <Grid
            container
          >
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
              >
                {site.daily[site.daily.length - 1].date.format('DD-MM-YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                align="right"
              >
                <Trans>
                  today
                </Trans>
              </Typography>
            </Grid>

          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                align="center"
              >
                {site.total.times
                  ? t`recent ${CountDays} days`
                  : t`recent ${CountDays} day`}
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
              >
                {site.total.times
                  ? t`outages ${site.total.times} times，outage-time ${formatDuration(site.total.duration)}，average availability ${site.average}%`
                  : t`availability ${site.average}%`}
              </Typography>
            </Grid>
          </Grid>
          <ReactTooltip
            className="tooltip"
            place="top"
            type="dark"
            effect="solid"
            html
          />
        </Grid>
        <Grid
          container
        >
          <Grid
            item
            xs={12}
            style={{
              textAlign: 'center',
            }}
          >
            <a href={site.url} target="_blank" rel="noreferrer">
              <Trans>
                {`View ${site.name} status on UpTimeRobot`}
              </Trans>
            </a>
          </Grid>
        </Grid>
      </Grid>
    ));
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}

UptimeRobot.propTypes = {
  apikey: PropTypes.string.isRequired,
  WhichTipBots: PropTypes.string.isRequired,
  CountDays: PropTypes.number.isRequired,
};

export default UptimeRobot;
