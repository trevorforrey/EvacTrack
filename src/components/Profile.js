import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      username: "pahorto", 
      name: "Paul Horton", 
      email: "pahorton@asu.edu",
      householdMembers: [{name: "Cecilia LaPlace", relation: "girlfriend", type: "human"}, 
                         {name: "Hannibal", relation: "pet", type:"elephant"}],
      homeAddress: "1234 E Banana Street. Mesa, AZ",
      phoneNumbers: [{type: "cell", number: "123-456-7890"}] 

    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  render() {
    const { classes } = this.props;
    return (
      <div style={{textAlign: 'center'}}>
        <br/>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            {this.state.username + "'s Profile"} 
          </Typography>
          <Typography component="div">
            <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            /><br/>
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            /><br/>
            <TextField
              id="homeAddress"
              label="Home Address"
              className={classes.textField}
              value={this.state.homeAddress}
              onChange={this.handleChange('homeAddress')}
              margin="normal"
            />
            </form>
          </Typography>
        </Paper>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);