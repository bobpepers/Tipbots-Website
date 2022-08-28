import React, {
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  MenuItem,
  Typography,
} from '@mui/material';
import { Trans, t } from '@lingui/macro';
import { Form } from 'react-final-form';
import axios from 'axios';
import { withRouter } from '../hooks/withRouter';
import TextField from './FormComponents/TextField';
import Select from './FormComponents/Select';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';

function SubmitButton(props) {
  return <button {...props} type="submit" />
}

function ResetButton(props) {
  return <button {...props} type="button" />
}

const SupportForm = function () {
  const [formSubmitting, setFormSubmitting] = useState('waiting');

  const onSubmit = async (values) => {
    const body = {
      content: '<@217379915803131906>',
      tts: false,
      color: 'white',
      embeds: [
        {
          title: `request support: ${values.email} - ${values.bot} (${values.platform})`,
          description: values.description,
        },
      ],
    };
    try {
      const data = await axios.post(
        'https://discord.com/api/webhooks/1013135176672485376/7nUBh9iqGtHHsTWHVYmwPUse2-VqkSiPQgkVYIY1KD2vDzA1pqDbJDeQBI34i-vS2u_A',
        body,
      );
      if (data.status === 204) {
        setFormSubmitting('success');
      } else {
        setFormSubmitting('fail');
      }
    } catch (error) {
      setFormSubmitting('fail');
      console.error(error);
    }
  }

  useEffect(() => { }, [
    formSubmitting,
  ]);

  useEffect(() => { }, []);

  return (
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        // values,
      }) => (
        <form onSubmit={handleSubmit}>
          {
            (formSubmitting === 'waiting' || formSubmitting === 'fail') && (
              <Grid
                container
              >
                <Grid
                  item
                  xs={12}
                  className="mb-1"
                >
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="mb-1"
                >
                  <Select
                    name="bot"
                    label={t`Tipbot`}
                    formControlProps={{ margin: 'normal' }}
                    required
                  >
                    {tipbotInfoArray.map((tipbot) => (
                      <MenuItem
                        value={tipbot.name.toLowerCase()}
                      >
                        {tipbot.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="mb-1"
                >
                  <Select
                    name="platform"
                    label={t`Platform`}
                    formControlProps={{ margin: 'normal' }}
                    required
                  >
                    <MenuItem value="discord">
                      Discord
                    </MenuItem>
                    <MenuItem value="telegram">
                      Telegram
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="mb-1"
                >
                  <TextField
                    label={t`Issue Description`}
                    name="description"
                    required
                    multiline
                    rows={10}
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="mb-1"
                >
                  <Button
                    component={SubmitButton}
                    variant="contained"
                    color="success"
                    disabled={submitting}
                    fullWidth
                    size="large"
                  >
                    <Trans>
                      Submit
                    </Trans>
                  </Button>
                </Grid>
                {
                  formSubmitting === 'fail' && (
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          className="failColor"
                          align="center"
                        >
                          <Trans>
                            Something went wrong, please retry submitting
                          </Trans>
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                }
                <Grid
                  item
                  xs={12}
                >
                  <Button
                    component={ResetButton}
                    variant="contained"
                    color="error"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                    fullWidth
                    size="large"
                  >
                    <Trans>
                      Reset
                    </Trans>
                  </Button>
                </Grid>
              </Grid>
            )
          }
          {
            formSubmitting === 'success' && (
              <Grid container>
                <Grid
                  item
                  xs={12}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="successColor"
                    align="center"
                  >
                    <Trans>
                      Successfully Send Support Request
                    </Trans>
                  </Typography>
                </Grid>
              </Grid>
            )
          }
        </form>
      )}
    />
  );
}

export default withRouter(connect(null, null)(SupportForm));
