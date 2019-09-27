import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Launch from '@material-ui/icons/Launch';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
          <Typography variant="title" color="inherit">
            Dave's React Render Tests...
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  )
};

// ------------------------------------------------------
// PageHome...
// ------------------------------------------------------

class PageHome extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      menu: [
        { i:1,
          t:"Controlled Form Fields",
          d:"Observe the rendering on a page with controlled form fields",
          p:"/controlled"
        },
        { i:2,
          t:"Uncontrolled Form Fields",
          d:"Observe the rendering on a page with uncontrolled form fields",
          p:"/uncontrolled"
        },
      ]
    };
  }

  createListItem(menuitem, index) {
    return (
      <React.Fragment>
        <ListItem dense button key={menuitem.i}
          onClick={(event) => {
            this.handleOnClickListItem(event, index);
          }}>
        <ListItemIcon>{<Launch/>}</ListItemIcon>
        <ListItemText primary={menuitem.t}
          secondary={
            <Typography
              component="div"
              variant="caption"
              color="textSecondary"
            ><em>{menuitem.d}</em></Typography>
          } />
        </ListItem>
        <Divider/>
      </React.Fragment>
    );
  }

  handleOnClickListItem( event, index )
  {
    //alert( id );
    this.props.history.push( this.state.menu[index].p );
  }

  render() {
    const items = this.state.menu.map(this.createListItem.bind(this));
    return (
      <div style={{marginTop:70}}>
        <TheAppBar/>
        <List dense style={this.styles}>
          {items}
        </List>
      </div>
    );
  } // end render()
}

export default PageHome;