import axios from 'axios';
import moment from 'moment';
import { formatNumber } from './utils';

export async function GetMonitors(
  apikey,
  days,
  WhichTipBots,
) {
  const dates = [];
  const today = moment((new Date()).setHours(0, 0, 0, 0));
  for (let d = 0; d < days; d += 1) {
    const newDate = today.subtract(1, 'days');
    dates.unshift(moment(newDate));
  }
  const ranges = dates.map((date) => `${date.unix()}_${date.add(1, 'day').unix()}`);
  const start = dates[dates.length - 1].unix();
  const end = dates[0].add(1, 'day').unix();
  ranges.push(`${start}_${end}`);

  const postdata = {
    api_key: apikey,
    format: 'json',
    logs: 1,
    log_types: '1-2',
    logs_start_date: start,
    logs_end_date: end,
    custom_uptime_ranges: ranges.join('-'),
    monitors: WhichTipBots, // Monitor Id's to return
  };

  const response = await axios.post('https://api.uptimerobot.com/v2/getMonitors', postdata, { timeout: 10000 });
  if (response.data.stat !== 'ok') throw response.data.error;
  return response.data.monitors.map((monitor) => {
    const newRanges = monitor.custom_uptime_ranges.split('-');
    const average = formatNumber(newRanges.pop());
    const daily = [];
    const map = [];
    dates.forEach((date, index) => {
      map[date.format('YYYYMMDD')] = index;
      daily[index] = {
        date,
        uptime: formatNumber(newRanges[index]),
        down: {
          times: 0,
          duration: 0,
        },
      }
    });

    const total = monitor.logs.reduce((totalX, log) => {
      if (log.type === 1) {
        const date = moment.unix(log.datetime).format('YYYYMMDD');
        totalX.duration += log.duration;
        totalX.times += 1;
        daily[map[date]].down.duration += log.duration;
        daily[map[date]].down.times += 1;
      }
      return totalX;
    }, { times: 0, duration: 0 });

    const result = {
      id: monitor.id,
      name: monitor.friendly_name,
      url: `https://stats.uptimerobot.com/klo5QskN2k/${monitor.id}`,
      average,
      daily,
      total,
      status: 'unknow',
    };
    console.log(result);

    if (monitor.status === 2) result.status = 'ok';
    if (monitor.status === 9) result.status = 'down';
    return result;
  });
}
