import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Divider,
} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { setUserSettings } from '../../actions/userSettings';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserSettingsModal(props) {
  const {
    userSettings,
    tipbotInfo,
    chatClient,
  } = props;
  const {
    stealth,
    excludePublicStats,
    ignoreMe,
  } = userSettings;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [unitStealth, setUnitStealth] = useState(stealth);
  const [unitExcludePublicStats, setUnitExcludePublicStats] = useState(excludePublicStats);
  const [unitIgnoreMe, setUnitIgnoreMe] = useState(ignoreMe);

  const handleChangeStealth = async (event) => {
    setUnitStealth(event.target.value);
    dispatch(
      setUserSettings(
        tipbotInfo,
        chatClient,
        event.target.value,
        unitExcludePublicStats,
        unitIgnoreMe,
      ),
    );
  };

  const handleChangeExcludePublicStats = async (event) => {
    setUnitExcludePublicStats(event.target.value);
    dispatch(
      setUserSettings(
        tipbotInfo,
        chatClient,
        unitStealth,
        event.target.value,
        unitIgnoreMe,
      ),
    );
  };

  const handleChangeIgnoreMe = async (event) => {
    setUnitIgnoreMe(event.target.value);
    dispatch(
      setUserSettings(
        tipbotInfo,
        chatClient,
        unitStealth,
        unitExcludePublicStats,
        event.target.value,
      ),
    );
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>
        User Settings
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-ignoreMe" variant="h6">
            Ignore Me: On/Off [
            {ignoreMe ? 'On' : 'Off'}
            ]
          </Typography>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="ignoreMe-select-label">
              IgnoreMe
            </InputLabel>
            <Select
              labelId="ignoreMe-select-label"
              id="ignoreMe-select"
              value={unitIgnoreMe}
              label="ignoreMe"
              onChange={handleChangeIgnoreMe}
            >
              <MenuItem
                key="true-ignoreMe"
                value
              >
                Ignore me: On
              </MenuItem>
              <MenuItem
                key="false-ignoreMe"
                value={false}
              >
                Ignore me: Off
              </MenuItem>
            </Select>
          </FormControl>
          <Typography id="modal-modal-ignoreMe" variant="body1">
            determines wether you are tagged in mass tipping operations
          </Typography>
          <Divider
            style={{
              paddingBottom: '1rem',
            }}
          />
          <Typography id="modal-modal-excludePublicStats" variant="h6">
            Exclude Public Statistics: On/Off [
            {excludePublicStats ? 'On' : 'Off'}
            ]
          </Typography>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="excludePublicStats-select-label">Faucet channel</InputLabel>
            <Select
              labelId="excludePublicStats-select-label"
              id="excludePublicStats-select"
              value={unitExcludePublicStats}
              label="Exclude Public Stats"
              onChange={handleChangeExcludePublicStats}
            >
              <MenuItem
                key="true-excludePublicStats"
                value
              >
                Exclude Public Stats: On
              </MenuItem>
              <MenuItem
                key="false-excludePublicStats"
                value={false}
              >
                Exclude Public Stats: Off
              </MenuItem>
            </Select>
          </FormControl>
          <Typography id="modal-modal-excludePublicStats" variant="body1">
            determines wether you are publicly included in statistics, ex. top10 donators thank message, mode on = excluded from public statistics
          </Typography>
          <Divider
            style={{
              paddingBottom: '1rem',
            }}
          />
          <Typography id="modal-modal-stealth" variant="h6">
            Stealth: On/Off [
            {stealth ? 'On' : 'Off'}
            ]
          </Typography>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="stealth-select-label">Stealth</InputLabel>
            <Select
              labelId="stealth-select-label"
              id="stealth-select"
              value={unitStealth}
              label="Stealth"
              onChange={handleChangeStealth}
            >
              <MenuItem
                key="true-stealth"
                value
              >
                Stealth: On
              </MenuItem>
              <MenuItem
                key="false-stealth"
                value={false}
              >
                Stealth: Off
              </MenuItem>
            </Select>
          </FormControl>
          <Typography id="modal-modal-stealth" variant="body1">
            Experimental stealth mode, removes commands after using them and adds anonymous tag to tipping features
          </Typography>
          <Divider
            style={{
              paddingBottom: '1rem',
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
