import React, {
  useEffect,
} from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@mui/material';
import { Trans } from '@lingui/macro';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TelegramCommands(
  props,
) {
  const {
    tipbotInfo,
  } = props;

  useEffect(() => {}, [tipbotInfo]);

  return (
    <Grid
      container
      spacing={2}
      className="mb-1"
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h6"
        >
          <Trans>
            Telegram Commands
          </Trans>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel1a-content"
            id="telegramPanel1a-header"
          >
            <Typography>
              <Trans>
                Help
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
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
                  {tipbotInfo.telegramCommandPrefix}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.telegramCommandPrefix}
                  {' help'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  /help
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel2a-content"
            id="telegramPanel2a-header"
          >
            <Typography>
              <Trans>
                Price
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
            >
              <Trans>
                {'Display current '}
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' price'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  /price
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel3a-content"
            id="telegramPanel3a-header"
          >
            <Typography>
              <Trans>
                Info
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' info'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  /info
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel4a-content"
            id="telegramPanel4a-header"
          >
            <Typography>
              <Trans>
                Balance
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
            >
              <Trans>
                {'Display '}
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' balance'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  /balance
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel5a-content"
            id="telegramPanel5a-header"
          >
            <Typography>
              <Trans>
                Fees
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
            >
              <Trans>
                {'Displays '}
                {tipbotInfo.name}
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' fees'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel6a-content"
            id="telegramPanel6a-header"
          >
            <Typography>
              <Trans>
                Tip
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' <@user> <amount>'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.telegramCommandPrefix}
                  {' @Bagosan 1.00'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.telegramCommandPrefix}
                  {' <@user> <@user> <@user> <amount|all> [split|each]'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.telegramCommandPrefix}
                  {' @test123456 @test123457 1.00 each'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel7a-content"
            id="telegramPanel7a-header"
          >
            <Typography>
              <Trans>
                Flood
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
            >
              <Trans>
                {'Floods the desired amount of '}
                {tipbotInfo.ticker}
                {`${' '}onto all users (including offline users)`}
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' flood <amount|all>'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.telegramCommandPrefix}
                  {' flood 5.00'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel8a-content"
            id="telegramPanel8a-header"
          >
            <Typography>
              <Trans>
                Rain
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
            >
              <Trans>
                {'Rains the desired amount of '}
                {tipbotInfo.ticker}
                {`${' '}onto all recently online users`}
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' rain <amount|all>'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.telegramCommandPrefix}
                  {' rain 5.00'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel9a-content"
            id="telegramPanel9a-header"
          >
            <Typography>
              <Trans>
                Sleet
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
            >
              <Trans>
                {'Sleets the desired amount of '}
                {tipbotInfo.ticker}
                {`${' '}onto all active users (default time is 15min)`}
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' sleet <amount|all>'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.telegramCommandPrefix}
                  {' sleet 5.00'}
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel10a-content"
            id="telegramPanel10a-header"
          >
            <Typography>
              <Trans>
                Deposit
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
            >
              <Trans>
                {'Displays your '}
                {tipbotInfo.ticker}
                {`${' '}deposit address`}
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' deposit'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  /deposit
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel11a-content"
            id="telegramPanel11a-header"
          >
            <Typography>
              <Trans>
                Withdraw
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
            >
              <Trans>
                {'Withdraws an entered amount to a '}
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' withdraw <address> <amount>'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  {tipbotInfo.telegramCommandPrefix}
                  {' withdraw '}
                  {tipbotInfo.exampleAddress}
                  5.20
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="telegramPanel12a-content"
            id="telegramPanel12a-header"
          >
            <Typography>
              <Trans>
                Faucet
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="mb-1"
            >
              <Trans>
                {'Claim a small amount of '}
                {tipbotInfo.ticker}
                {`${' '}from the faucet`}
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
                  {tipbotInfo.telegramCommandPrefix}
                  {' faucet'}
                </Typography>
              </code>
            </pre>
            <pre>
              <code>
                <Typography>
                  /faucet
                </Typography>
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>

      </Grid>
    </Grid>
  );
}

TelegramCommands.propTypes = {
  tipbotInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    telegramCommandPrefix: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    exampleAddress: PropTypes.string.isRequired,
  }).isRequired,
};

export default TelegramCommands;
