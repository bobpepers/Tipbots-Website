import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import {
  Button,
  MenuItem,
  Menu,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { Trans } from '@lingui/macro';
import { ReactComponent as MobileNav } from '../assets/images/mobilenav.svg';
import Runebase from '../assets/images/runebaseloop.gif';
import Pirate from '../assets/images/pirate.png';
import Tokel from '../assets/images/tokel.png';

const Header = function (props) {
  const {
    t,
    i18n,
    user,
  } = props;
  const heightRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [height, setHeight] = useState(0);
  const [anchorElTipBots, setAnchorElTipBots] = useState(null);
  const openTipBots = Boolean(anchorElTipBots);
  const [anchorElFunctions, setAnchorElFunctions] = useState(null);
  const openFunctions = Boolean(anchorElFunctions);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleWindowResize = useCallback((event) => {
    if (height !== heightRef.current.clientHeight) {
      setHeight(heightRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    setHeight(heightRef.current.clientHeight);
  }, [menu]);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleClickTipbots = (event) => {
    setAnchorElTipBots(event.currentTarget);
  };
  const handleCloseTipbots = () => {
    setAnchorElTipBots(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const show = (menu) ? 'show' : '';

  return (
    <header className="rootRow header" style={{ height }}>
      <Navbar
        ref={heightRef}
        fixed="top"
        className="navbar navbar-default"
        expand="lg"
      >
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <MobileNav
            className="mobileNav"
          />
        </button>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`collapse navbar-collapse ${show}`}
        >
          <Nav className="mr-auto rNavbar">
            <Button
              component={Link}
              variant="outlined"
              style={{
                fontSize: '14px',
                fontWeight: 200,
                marginRight: '10px',
              }}
              size="large"
              to="/"
              aria-controls="basic-menu"
              aria-haspopup="true"
            >
              <Trans>Home</Trans>
            </Button>
            <Button
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={openTipBots ? 'true' : undefined}
              onClick={handleClickTipbots}
              variant="outlined"
              style={{
                fontSize: '14px',
                fontWeight: 200,
                marginRight: '10px',
              }}
            >
              <Trans>Tipbots</Trans>
            </Button>
            <Menu
              anchorEl={anchorElTipBots}
              open={openTipBots}
              onClose={handleCloseTipbots}
              MenuListProps={{
                //  'aria-labelledby': 'basic-button',
              }}
            >
              <Link
                className="nav-link"
                to="/tipbots/runestip"
              >
                <MenuItem onClick={handleCloseTipbots}>
                  <img className="menuIcon" src={Runebase} alt="Runebase Logo" />
                  RunesTip
                </MenuItem>
              </Link>

              <Link
                className="nav-link"
                to="/tipbots/piratetip"
              >
                <MenuItem onClick={handleCloseTipbots}>
                  <img className="menuIcon" src={Pirate} alt="Pirate Logo" />
                  PirateTip
                </MenuItem>
              </Link>

              <Link
                className="nav-link"
                to="/tipbots/tokeltip"
              >
                <MenuItem onClick={handleCloseTipbots}>
                  <img className="menuIcon" src={Tokel} alt="Tokel Logo" />
                  TokelTip
                </MenuItem>
              </Link>
            </Menu>
            <Button
              // component={Link}
              variant="outlined"
              style={{
                fontSize: '14px',
                fontWeight: 200,
                marginRight: '10px',
              }}
              size="large"
              // to="/uptime"
              onClick={() => window.open('https://stats.uptimerobot.com/klo5QskN2k', '_blank')}
              aria-controls="basic-menu"
              aria-haspopup="true"
            >
              <Trans>Uptime</Trans>
            </Button>

            <Button
              component={Link}
              variant="outlined"
              style={{
                fontSize: '14px',
                fontWeight: 200,
                marginRight: '10px',
              }}
              size="large"
              to="/support"
              aria-controls="basic-menu"
              aria-haspopup="true"
            >
              <Trans>Support</Trans>
            </Button>
          </Nav>
          {/* <ul>
            <li>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </li>
          </ul> */}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    // authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(Header);
