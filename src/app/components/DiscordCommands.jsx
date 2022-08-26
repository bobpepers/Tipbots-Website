import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@mui/material';
import { Trans } from '@lingui/macro';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function DiscordCommands(
  props,
) {
  const {
    tipbotInfo,
  } = props;

  useEffect(() => { }, [tipbotInfo]);

  return (
    <Grid
      container
      spacing={2}
      className="pb-1"
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h6"
        >
          <Trans>
            Discord Commands
          </Trans>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <Trans>
                Help
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Displays '}
                {tipbotInfo.name}
                {`${' '}help message`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' help'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              <Trans>
                Info
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Displays '}
                {tipbotInfo.ticker}
                {`${' '}coin info`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' info'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>
              <Trans>
                Balance
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Displays your '}
                {tipbotInfo.ticker}
                {`${' '}balance`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' balance'}
                </Typography>
              </code>
            </pre>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>
              <Trans>
                Price
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Typography
              className="pb-1"
            >
              <Trans>
                {'Displays '}
                {tipbotInfo.ticker}
                {`${' '}price`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' price'}
                </Typography>
              </code>
            </pre>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography>
              <Trans>
                Statistics
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Displays your '}
                {tipbotInfo.name}
                {`${' '}tip statistics`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' stats'}
                </Typography>
              </code>
            </pre>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <Typography>
              <Trans>
                Deposit
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Displays '}
                {tipbotInfo.ticker}
                {`${' '}deposit address and QR code`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' deposit'}
                </Typography>
              </code>
            </pre>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
            <Typography>
              <Trans>
                Fees
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Displays '}
                {tipbotInfo.ticker}
                {`${' '}fee schedule`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' fees'}
                </Typography>
              </code>
            </pre>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8a-content"
            id="panel8a-header"
          >
            <Typography>
              <Trans>
                Withdraw
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Withdraws the entered amount to a '}
                {tipbotInfo.ticker}
                {`${' '}address of your choice`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' withdraw ReU2nhYXamYRd2VBk4auwresov6jwLEuSg 5.20'}
                </Typography>
              </code>
            </pre>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9a-content"
            id="panel9a-header"
          >
            <Typography>
              <Trans>
                Tip
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Tips the @ mentioned user with the desired amount of '}
                {tipbotInfo.ticker}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' tip @test123456#7890 1.00'}
                </Typography>
              </code>
            </pre>

            <Typography>
              <Trans>
                Multiple users:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' tip @test123456#7890 @test123457#7890 1.00 each'}
                </Typography>
              </code>
            </pre>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10a-content"
            id="panel10a-header"
          >
            <Typography>
              <Trans>
                Rain
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Rains the desired amount of '}
                {tipbotInfo.ticker}
                {`${' '}onto all online users (optionally, within specified role)`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' rain 10'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' rain 10 @supporters'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel11a-content"
            id="panel11a-header"
          >
            <Typography>
              <Trans>
                Soak
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Soaks the desired amount of '}
                {tipbotInfo.ticker}
                {`${' '}onto all online and idle users (optionally, within specified role)`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' soak 3.00'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' soak 3.00 @supporters'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel12a-content"
            id="panel12a-header"
          >
            <Typography>
              <Trans>
                Flood
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Floods the desired amount of '}
                {tipbotInfo.ticker}
                {`${' '}onto all users, including offline users (optionally, within specified role)`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' flood 5.00'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' flood 5.00 @supporters'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel13a-content"
            id="panel13a-header"
          >
            <Typography>
              <Trans>
                Sleet
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Makes a sleet storm with the desired amount of '}
                {tipbotInfo.ticker}
                {`${' '}onto all users that have been active in the channel in the last 15 minutes (optionally, within a specified time)`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' sleet 5.00'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' sleet 5.00 10m'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel14a-content"
            id="panel14a-header"
          >
            <Typography>
              <Trans>
                VoiceRain
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Rains the desired amount of '}
                {tipbotInfo.ticker}
                {`${' '}onto all listening users in the mentioned voice channel.`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' voicerain 5.00 #General'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' voicerain 5.00 #General @supporters'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel15a-content"
            id="panel15a-header"
          >
            <Typography>
              <Trans>
                Thunder
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Tips a random lucky online user with an amount of '}
                {tipbotInfo.ticker}
                {`${' '}(optionally, within specified role)`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' thunder 5'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' thunder 5 @supporters'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel16a-content"
            id="panel16a-header"
          >
            <Typography>
              <Trans>
                ThunderStorm
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Tips a specified number (max: 50) random lucky online users with part of the amount of '}
                {tipbotInfo.ticker}
                {`${' '}(optionally, within specified role)`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' '}
                  thunderstorm 10 5.00
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' thunderstorm 10 5.00 @supporters'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel17a-content"
            id="panel17a-header"
          >
            <Typography>
              <Trans>
                Hurricane
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Tips a specified number (max: 50) random lucky online and idle users with part of the amount of '}
                {tipbotInfo.ticker}
                {`${' '}(optionally, within specified role)`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' hurricane 10 5.00'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' hurricane 10 5.00 @supporters'}
                </Typography>
              </code>
            </pre>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel18a-content"
            id="panel18a-header"
          >
            <Typography>
              <Trans>
                Reactdrop
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Performs a react airdrop with the amount, optionally within custom time, optionally using a custom-supplied emoji. <time> parameter accepts time interval expressions in the form of: 60s, 5m, 1h. Default time interval is 5m (5minutes)'}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' reactdrop <amount> [<time>] [<emoji>]'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' reactdrop 10 20m'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' reactdrop 10 3h 😃'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel18a-content"
            id="panel18a-header"
          >
            <Typography>
              <Trans>
                Trivia
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Performs a trivia with the amount of '}
                {tipbotInfo.ticker}
                {',  optionally with set amount of of people, optionally within custom time. &lt;time&gt; parameter accepts time interval expressions in the form of: 60s, 5m, 1h. Default time interval is 5m (5minutes)'}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' trivia <amount> [<amountOfPeople>] [<time>]'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' trivia 5'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' trivia 5 3 40s'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel18a-content"
            id="panel18a-header"
          >
            <Typography>
              <Trans>
                IgnoreMe
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                Turns @mentioning you during mass operations on/off
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' ignoreme'}
                </Typography>
              </code>
            </pre>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel19a-content"
            id="panel19a-header"
          >
            <Typography>
              <Trans>
                Faucet
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Gets a small amount of '}
                {tipbotInfo.ticker}
                {`${' '}from the faucet (applicable every 4 hours)`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' faucet'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel19a-content"
            id="panel19a-header"
          >
            <Typography>
              <Trans>
                Support
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="pb-1"
            >
              <Trans>
                {'Show link to '}
                {tipbotInfo.name}
                {`${' '}support server`}
              </Trans>
            </Typography>
            <Typography>
              <Trans>
                Examples:
              </Trans>
            </Typography>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.discordCommandPrefix}
                  {' support'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

      </Grid>
    </Grid>
  );
}

DiscordCommands.propTypes = {
  tipbotInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    discordCommandPrefix: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
  }).isRequired,
};

export default DiscordCommands;
