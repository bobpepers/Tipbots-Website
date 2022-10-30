import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  MenuItem,
  Menu,
  useMediaQuery,
} from '@mui/material';
import { Trans } from '@lingui/macro';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useTheme } from '@mui/material/styles';
import Discord from '../assets/images/discord.svg';
import Telegram from '../assets/images/telegram.svg';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';
import MobileNav from '../assets/images/mobilenav.svg';

function Header() {
  const heightRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [mainMenuHeight, setMainMenuHeight] = useState(0);
  const [anchorElTipBots, setAnchorElTipBots] = useState(null);
  const [anchorElDashboards, setAnchorElDashboards] = useState(null);
  const openTipBots = Boolean(anchorElTipBots);
  const openDashboards = Boolean(anchorElDashboards);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setMainMenuHeight(heightRef.current.clientHeight);
  }, [menu]);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const toggleCloseMenu = () => {
    setMenu(false);
  };

  const handleClickTipbots = (event) => {
    setAnchorElTipBots(event.currentTarget);
  };

  const handleCloseTipbots = () => {
    setAnchorElTipBots(null);
  };

  const handleClickDashboards = (event) => {
    setAnchorElDashboards(event.currentTarget);
  };

  const handleCloseDashboards = () => {
    setAnchorElDashboards(null);
  };

  const mainMenuItems = () => (
    <>
      <Button
        component={Link}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
          marginTop: mdDown ? '0.5rem' : '0px',
        }}
        size="large"
        to="/"
        aria-controls="basic-menu"
        aria-haspopup="true"
        className="headerMenuTextColor"
        onClick={() => toggleCloseMenu()}
      >
        <HomeIcon
          className="buttonMenuIcon headerMenuTextColor"
        />
        <Trans>
          Home
        </Trans>
      </Button>
      {/* <Button
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openDashboards ? 'true' : undefined}
        onClick={handleClickDashboards}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
        }}
        className="headerMenuTextColor"
      >
        <SmartToyIcon
          className="buttonMenuIcon headerMenuTextColor"
        />
        <Trans>
          Dashboard
        </Trans>
      </Button>
      <Menu
        anchorEl={anchorElDashboards}
        open={openDashboards}
        onClose={handleCloseDashboards}
        MenuListProps={{
          //  'aria-labelledby': 'basic-button',
        }}
      >
        <Link
          key="dashboard-link-discord"
          className="nav-link"
          to="/dashboard/discord"
          onClick={() => toggleCloseMenu()}
        >
          <MenuItem
            onClick={handleCloseDashboards}
          >
            Discord
          </MenuItem>
        </Link>
      </Menu> */}
      <Button
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openTipBots ? 'true' : undefined}
        onClick={handleClickTipbots}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
        }}
        className="headerMenuTextColor"
      >
        <SmartToyIcon
          className="buttonMenuIcon headerMenuTextColor"
        />
        <Trans>
          Tipbots
        </Trans>
      </Button>
      <Menu
        anchorEl={anchorElTipBots}
        open={openTipBots}
        onClose={handleCloseTipbots}
        MenuListProps={{
          //  'aria-labelledby': 'basic-button',
        }}
      >
        {tipbotInfoArray.map((tipbot) => (
          <Link
            key={`tipbot-link-${tipbot.name}`}
            className="nav-link"
            to={`/tipbots/${tipbot.name.toLowerCase()}`}
            onClick={() => toggleCloseMenu()}
          >
            <MenuItem
              onClick={handleCloseTipbots}
            >
              <img
                className="menuIcon"
                src={tipbot.logo}
                alt={`${tipbot.name} Logo`}
              />
              {tipbot.name}
            </MenuItem>
          </Link>
        ))}
      </Menu>
      <Button
        component={Link}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
        }}
        size="large"
        to="/uptime"
        aria-controls="basic-menu"
        aria-haspopup="true"
        className="headerMenuTextColor"
        onClick={() => toggleCloseMenu()}
      >
        <KeyboardDoubleArrowUpIcon
          className="buttonMenuIcon headerMenuTextColor"
        />
        <Trans>
          Uptime
        </Trans>
      </Button>

      <Button
        component={Link}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
        }}
        size="large"
        to="/support"
        aria-controls="basic-menu"
        aria-haspopup="true"
        className="headerMenuTextColor"
        onClick={() => toggleCloseMenu()}
      >
        <SupportAgentIcon
          className="buttonMenuIcon headerMenuTextColor"
        />
        <Trans>
          Support
        </Trans>
      </Button>
    </>
  );

  const socialMenuItems = () => (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <div
        style={{
          display: 'block',
          float: 'right',
        }}
      >
        <IconButton
          size="large"
          edge="end"
          aria-label="Link to telegram community server"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          target="_blank"
          href="https://t.me/runebase_runes"
          color="inherit"
        >
          <Telegram
            style={{
              height: '1.5rem',
              width: '1.5rem',
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          display: 'block',
          float: 'right',
        }}
      >
        <IconButton
          size="large"
          edge="end"
          aria-label="Link to discord community server"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          target="_blank"
          href="https://discord.gg/CdUSaVfp8Q"
          color="inherit"
          style={{
            marginLeft: '0.5rem',
          }}
        >
          <Discord
            style={{
              height: '1.5rem',
              width: '1.5rem',
            }}
          />
        </IconButton>
      </div>

    </Box>
  );

  return (
    <div
      className="header initHeaderHeight"
      style={{
        height: mainMenuHeight,
      }}
    >
      <AppBar
        position="relative"
        className="navbar"
        sx={{
          width: '100%',
        }}
      >
        <Toolbar
          disableGutters
          variant="dense"
          ref={heightRef}
          sx={{
            width: '100%',
            paddingBottom: '0.5rem',
            paddingTop: '0.5rem',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              flexDirection: 'column',
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                flexDirection: 'row',
                display: {
                  xs: 'flex',
                  md: 'none',
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="Mobile Navigation"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleMenu}
                className="navbar-toggler"
                sx={{
                  padding: 0,
                }}
              >
                <MobileNav
                  className="mobileNav"
                />
              </IconButton>
              {socialMenuItems()}
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                flexDirection: 'column',
                alignSelf: 'flex-start',
                display: {
                  xs: menu ? 'flex' : 'none',
                  md: 'none',
                },
              }}
            >
              {mainMenuItems()}
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            {mainMenuItems()}
            {socialMenuItems()}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;
