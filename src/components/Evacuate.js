import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchUI from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Evacuate extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      checked: false,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  
  render() {
    const { classes } = this.props;
    return (
      <div style={{textAlign: 'center'}}>
        <br/>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            Evacuate 
          </Typography>
          <Typography component="div">
            It's incredibly important that you mark yourself as evacuated after 
            you evacuate your home. 
            <br/>Have you evacuated? &nbsp;
            <FormControlLabel
                control={
                    <SwitchUI
                    checked={this.state.checked}
                    onChange={this.handleChange('checked')}
                    value="checked"
                    color="primary"
                    />
                }
            />

          </Typography>
        </Paper>
      </div>
    );
  }
}

Evacuate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Evacuate);