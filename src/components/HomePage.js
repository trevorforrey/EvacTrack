import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class HomePage extends React.Component {
  
  render() {
    const { classes } = this.props;
    return (
      <div style={{textAlign: 'center'}}>
        <br/>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            Flash Flood Warning in your area
          </Typography>
          <Typography component="p">
            Areal Flood Watch in effect from Sunday, 2:00 AM EDT 
            until Monday, 7:00 PM EDT. Source: U.S. National Weather Service
          </Typography>
        </Paper>
        <br/>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            About EvacuTech
          </Typography>
          <Typography component="p">
            EvacuTech is a way to connect communities with their local first responders. 
            <br /> 
            We provide first responders with a way to notify the public when there is a 
            crisis that requires evacuation, and we allow the community to notify first 
            responders when they have evacuated and found safety. In addition, we provide 
            safety information such as evacuation locations, tips, and useful knowledge. 
          </Typography>
        </Paper>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
