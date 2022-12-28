import React, {
  useState,
  useEffect,
} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {
  useDispatch,
} from 'react-redux';
import {
  setDiscordFaucetChannelAction,
} from '../../actions/setDiscordFaucetChannel';
import {
  setDiscordTipChannelAction,
} from '../../actions/setDiscordTipChannel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ServerManagementModal(props) {
  const {
    myServers,
    userApiUrl,
  } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedServer, setSelectedServer] = useState(myServers[0]);
  const [selectedFaucetChannel, setSelectedFaucetChannel] = useState(myServers[0].channels.find((x) => x.id === myServers[0].discordFaucetChannelId)?.id || 'none');
  const [selectedTipChannel, setSelectedTipChannel] = useState(myServers[0].channels.find((x) => x.id === myServers[0].discordTipMessageChannelId)?.id || 'none');

  const handleServerChange = (event) => {
    const server = myServers.find((x) => x.groupId === event.target.value);
    const tipChannelId = server.channels.find((x) => x.id === server.discordTipMessageChannelId);
    const faucetChannelId = server.channels.find((x) => x.id === server.discordFaucetChannelId);
    setSelectedServer(server);
    setSelectedFaucetChannel(faucetChannelId);
    setSelectedTipChannel(tipChannelId);
  };

  const handleFaucetChannelChange = (event) => {
    const channelId = event.target.value;
    dispatch(
      setDiscordFaucetChannelAction(
        userApiUrl,
        selectedServer.groupId,
        channelId,
      ),
    );
    setSelectedFaucetChannel(channelId);
  };

  const handleTipChannelChange = (event) => {
    const channelId = event.target.value;
    dispatch(
      setDiscordTipChannelAction(
        userApiUrl,
        selectedServer.groupId,
        channelId,
      ),
    );
    setSelectedTipChannel(channelId);
  };

  useEffect(() => {
  }, [
    selectedServer,
    selectedFaucetChannel,
    selectedTipChannel,
  ]);

  return (
    <div>
      <Button onClick={handleOpen}>
        my Server
        {myServers.length > 1 ? 's' : ''}
        {' '}
        (
        {myServers.length}
        )
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="server-select-label">Server</InputLabel>
            <Select
              labelId="server-select-label"
              id="server-select"
              value={selectedServer.groupId}
              label="Server"
              onChange={handleServerChange}
            >
              {myServers.map((myServer) => (
                <MenuItem
                  key={`${myServer.groupId}-${myServer.groupName}`}
                  value={myServer.groupId}

                >
                  {myServer.groupName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography id="modal-modal-faucetchannel" variant="h6">
            Faucet Channel (None for unrestricted)
          </Typography>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="faucet-channel-select-label">Faucet channel</InputLabel>
            <Select
              labelId="faucet-channel-select-label"
              id="faucet-channel-select"
              value={selectedFaucetChannel || 'none'}
              label="Faucet Channel"
              onChange={handleFaucetChannelChange}
            >
              <MenuItem
                key="none"
                value="none"
              >
                None
              </MenuItem>
              {selectedServer && selectedServer.channels.map((channel) => (
                <MenuItem
                  key={`${channel.name}-${channel.id}`}
                  value={channel.id}
                >
                  {channel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography id="modal-modal-tipchannel" variant="h6">
            Tip channel (None for unrestricted)
          </Typography>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="tip-channel-select-label">Tip Channel</InputLabel>
            <Select
              labelId="tip-channel-select-label"
              id="tip-channel-select"
              value={selectedTipChannel || 'none'}
              label="Tip Channel"
              onChange={handleTipChannelChange}
            >
              <MenuItem
                key="none"
                value="none"
              >
                None
              </MenuItem>
              {selectedServer && selectedServer.channels.map((channel) => (
                <MenuItem
                  key={`${channel.name}-${channel.id}`}
                  value={channel.id}
                >
                  {channel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
