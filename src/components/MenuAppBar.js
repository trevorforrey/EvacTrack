import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: this.props.auth,
    leftMenuOpen: false,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.signout(); 
    this.setState({auth: false, anchorEl: null});
  };

  handleLogin = () => {
    this.props.signin();
    this.setState({auth: true, anchorEl: null}); 
  };

  toggleDrawer = () => {
    this.setState({leftMenuOpen: !this.state.leftMenuOpen});
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            { (auth &&
              <IconButton className={classes.menuButton} onClick={this.toggleDrawer} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>)
            }
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>EvacuTech</Link>
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <Link to='/profile' style={{textDecoration: 'none'}}><MenuItem onClick={this.handleClose}>Profile</MenuItem></Link>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (<Button color="inherit" onClick={this.handleLogin}>Login</Button>) }
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.leftMenuOpen} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <List component="nav">
              <Link to='family' style={{textDecoration:'none'}}>
                <ListItem button>
                  <ListItemText primary="Family and Friends" />
                </ListItem>
              </Link>
              <Link to='/evacuate' style={{textDecoration:'none'}}> 
                <ListItem button>
                  <ListItemText primary="Notification of Evacuation" />
                </ListItem>
              </Link>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);