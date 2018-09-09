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

class Family extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
    };
  }

  
  render() {
    const { classes } = this.props;
    return (
      <div style={{textAlign: 'center'}}>
        <br/>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            Feature Coming Soon 
          </Typography>
        </Paper>
      </div>
    );
  }
}

Family.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Family);