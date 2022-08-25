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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DiscordCommands(props) {
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
          <Trans>Discord Commands</Trans>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Help</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              help
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              info
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Balance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              balance
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>Price</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              price
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography>Stats</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              stats
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <Typography>Deposit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              deposit
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
            <Typography>Fees</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              fees
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8a-content"
            id="panel8a-header"
          >
            <Typography>Withdraw</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              withdraw
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9a-content"
            id="panel9a-header"
          >
            <Typography>Tip</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              tip
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10a-content"
            id="panel10a-header"
          >
            <Typography>Rain</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              rain
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel11a-content"
            id="panel11a-header"
          >
            <Typography>Soak</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              soak
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel12a-content"
            id="panel12a-header"
          >
            <Typography>Flood</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              flood
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel13a-content"
            id="panel13a-header"
          >
            <Typography>Sleet</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              sleet
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel14a-content"
            id="panel14a-header"
          >
            <Typography>VoiceRain</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              voicerain
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel15a-content"
            id="panel15a-header"
          >
            <Typography>Thunder</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              thunder
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel16a-content"
            id="panel16a-header"
          >
            <Typography>ThunderStorm</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              thunderstorm
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel17a-content"
            id="panel17a-header"
          >
            <Typography>Hurricane</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              hurricane
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel18a-content"
            id="panel18a-header"
          >
            <Typography>Trivia</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              trivia
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel18a-content"
            id="panel18a-header"
          >
            <Typography>IgnoreMe</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              ignoreme
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel19a-content"
            id="panel19a-header"
          >
            <Typography>Faucet</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              faucet
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel19a-content"
            id="panel19a-header"
          >
            <Typography>Support</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {tipbotInfo.discordCommandPrefix}
              {' '}
              support
            </Typography>
          </AccordionDetails>
        </Accordion>

      </Grid>
    </Grid>
  );
}
