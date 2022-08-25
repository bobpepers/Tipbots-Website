import React, {
  useEffect,
  useState,
} from 'react';
import ReactTooltip from 'react-tooltip';
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import { GetMonitors } from '../helpers/uptimerobot';
import { formatDuration, formatNumber } from '../helpers/utils';

function UptimeRobot({
  apikey,
  CountDays,
  ShowLink,
  WhichTipBots,
}) {
  const status = {
    ok: 'Ok',
    down: 'Down',
    unknow: 'Unknown',
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
      <div id="uptime">
        <div key={site.id} className="site">
          <div className="meta">
            <span className="name">
              {site.name}
            </span>
            <span className={`status ${site.status}`}>{status[site.status]}</span>
          </div>
          <div className="timeline">
            {site.daily.map((data, index) => {
              let status = '';
              let text = data.date.format('YYYY-MM-DD ');
              if (data.uptime >= 100) {
                status = 'ok';
                text += `availability ${formatNumber(data.uptime)}%`;
              } else if (data.uptime <= 0 && data.down.times === 0) {
                status = 'none';
                text += 'no data';
              } else {
                status = 'down';
                text += `Fault ${data.down.times} times，outage-time ${formatDuration(data.down.duration)}，availability ${formatNumber(data.uptime)}%`;
              }
              return (<i key={index} className={status} data-tip={text} />)
            })}
          </div>
          <div className="summary">
            <span>{site.daily[site.daily.length - 1].date.format('YYYY-MM-DD')}</span>
            <span>
              {site.total.times
                ? `recent ${CountDays} day outages ${site.total.times} times，outage-time ${formatDuration(site.total.duration)}，average availability ${site.average}%`
                : `recent ${CountDays} day availability ${site.average}%`}
            </span>
            <span>today</span>
          </div>
          <ReactTooltip className="tooltip" place="top" type="dark" effect="solid" />
        </div>
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
              View
              {' '}
              {site.name}
              {' '}
              status on UpTimeRobot
            </a>
          </Grid>
        </Grid>

      </div>
    ));
  }

  return (
    <div className="site">
      <div className="loading" />
    </div>
  );
}

export default UptimeRobot;
