import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Launch from '@material-ui/icons/Launch';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// ------------------------------------------------------
// TheAppBar...
// ------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function TheAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Dave's React Render Tests...
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  )
};

// -------------------------------------------------------------------------------
// LagOptions...
// -------------------------------------------------------------------------------

const stylesLagOptions = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: "8px", /* theme.spacing(1), */
    marginRight: "8px", /* theme.spacing(1), */
  },
  checkbox: {
    marginLeft: "16px",
    marginRight: "8px",
    paddingLeft: "8px",
    paddingTop: "8px",
    paddingRight: "8px",
    paddingBottom: "8px",
  },
});

class LagOptions_unstyled extends React.Component
{
  constructor(props) {
    super(props);

  } // end constructor()

  render() {
    if ( ! this.props.show )
      return "";
    return (
      <React.Fragment>
        <FormControlLabel
          control={
          <Checkbox
            id="simulatelag"
            value={this.props.simulatelag}
            onChange={this.props.onNewValue}
            color="primary"
          />
        }
        label="Simulate lag"
        />
        <TextField
          id="mslag"
          className={this.props.classes.textField}
          value={this.props.mslag}
          onChange={this.props.onNewValue}
          label="milliseconds"
          margin="dense"
          variant="outlined"
          InputLabelProps={{
            shrink: true, }}
        />
      </React.Fragment>
    );

  } // end render()
} // end class LagOptions_unstyled

LagOptions_unstyled.propTypes = {
  classes: PropTypes.object.isRequired,
};

const LagOptions = withStyles(stylesLagOptions)(LagOptions_unstyled);

// ------------------------------------------------------
// (exported) PageHome...
// ------------------------------------------------------

class PageHome extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      menu: [
        { i:1,
          t:"Controlled Form Fields Test 1",
          p:"/controlled1",
          d:"Observe the rendering on a page with controlled form fields",
          e:"Use the browser console to watch the log messages as you " +
            "interact with the form. Note that the text fields don't log " +
            "their renders only because I didn't wrap them in my own " +
            "component. You can imagine them rendening at the same timen " +
            "the dropdown fields render. " +
            "The code for the entire page runs upon every keystroke due to " +
            "the controlled form fields. There is an extremely noticeable " +
            "lag on my slow phone, especially when holding down the " +
            "backspace key. What am I doing wrong?",
          lagoption: true,
        },
        { i:2,
          t:"Uncontrolled Form Fields",
          p:"/uncontrolled",
          d:"Observe the rendering on a page with uncontrolled form fields",
          e:"This test is not implemented.",
          lagoption: false,
        },
      ],
      expanded: {}, // booleans by item id...
      simulatelag: false,
      mslag: 100,
    };

    this.handleOnClickExpand = this.handleOnClickExpand.bind(this);
    this.handleNewLagValue = this.handleNewLagValue.bind(this);
  }

  handleOnClickExpand( event, id )
  {
    //alert( id );
    this.setState( state => {
      state.expanded[id] = ! state.expanded[id];
      return { expanded: state.expanded };
    });
  }

  handleNewLagValue( event )
  {
    let name, value;
    name = event.target.id;
    value = event.target.value;
    this.setState( { [name]: value } );
  }

  createListItem(menuitem, index) {
    return (
      <React.Fragment key={menuitem.i}>
        <ListItem dense button
          key={menuitem.i}
          onClick={(event) => {
            this.handleOnClickListItem(event, index);
          }}>
        <ListItemIcon>{<Launch/>}</ListItemIcon>
        <ListItemText
          primary={menuitem.t}
          secondary={
            <Typography
              component="div"
              variant="caption"
              color="textSecondary"
            ><em>{menuitem.d}</em></Typography>
          } />
          <ListItemSecondaryAction>
            <IconButton onClick={ event => {
              this.handleOnClickExpand(event, menuitem.i);
            }}
            edge="end" aria-label="expand">
              { this.state.expanded[menuitem.i] ?
                <ExpandLess/> : <ExpandMore/>
              }
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse
            style={{paddingLeft:50}}
            in={this.state.expanded[menuitem.i]}
            timeout="auto" unmountOnExit>
          <Typography component="div" variant="caption" color="textSecondary">
            {menuitem.e}
          </Typography>
          <LagOptions
            show={menuitem.lagoption}
            simulatelag={this.state.simulatelag}
            mslag={this.state.mslag}
            onNewValue={this.handleNewLagValue}
            />
        </Collapse>
        <Divider/>
      </React.Fragment>
    );
  }

  handleOnClickListItem( event, index )
  {
    //alert( index );
    let dest = this.state.menu[index].p;
    let lag = 0;

    if ( this.state.simulatelag )
      lag = this.state.mslag;
    dest += "/" + lag;
    this.props.history.push( dest );
  }

  render() {
    const items = this.state.menu.map(this.createListItem.bind(this));
    return (
      <div style={{marginTop:70}}>
        <TheAppBar/>
        <List dense>
          {items}
        </List>
      </div>
    );
  } // end render()
}

export default PageHome;