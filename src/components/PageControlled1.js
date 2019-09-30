import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import MoreVert from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import FieldSimpleDropdown from "./FieldSimpleDropdown";
//import DialogSaveChanges from "./DialogSaveChanges";

// -------------------------------------------------------------------------------
// TheAppBar...
// -------------------------------------------------------------------------------

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

  global.davelogit( "Rendering TheAppBar" );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={props.onGoBack} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <ArrowBack />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <IconButton onClick={props.onSave} color="inherit" aria-label="save">
            <Save />
          </IconButton>
          <IconButton color="inherit" aria-label="more">
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
};

// -------------------------------------------------------------------------------
// TheForm...
// -------------------------------------------------------------------------------

const stylesTheForm = theme => ({
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
  dense: {
    marginTop: "16px", /* theme.spacing(2), */
  },
  menu: {
    width: 200,
  },

  button: {
    margin: "8px", /*theme.spacing(1), */
  },
  leftIcon: {
    marginRight: "8px", /*theme.spacing(1),*/
  },
  rightIcon: {
    marginLeft: "8px", /*theme.spacing(1),*/
  },
  iconSmall: {
    fontSize: 20,
  },
});

class TheForm_unstyled extends React.Component
{
  constructor(props) {
    super(props);

    global.davelogit( "TheForm.constructor()")

    this.state = {
      field_title: "",
      field_desc: "",
      field_category: "",
      field_subcategory: "",
    };

    //alert( "TheForm msdelay: " + this.props.msdelay );
    this.msdelay = this.props.msdelay;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  } // end constructor()

  handleSubmit( e ) {
    global.davelogit( "TheForm.handleSubmit()" );
    e.preventDefault(); // disable Enter key...
  }

  // called from the outside...
  getFormValues() {
    let values = {
      title: this.state.field_title,
      desc: this.state.field_desc,
      category: this.state.field_category,
      subcategory: this.state.field_subcategory,
    }
    return values;
  }

  handleTextChange( event )
  {
    let name, value;
    name = event.target.id;
    value = event.target.value;
    //alert( name + " = " + value );

    global.davelogit( "TheForm.handleTextChange()" );

    if ( this.msdelay )
    {
      setTimeout( () => {
        this.setState( { ["field_" + name]: value } );
        }, this.msdelay );
    }
    else
    {
      this.setState( { ["field_" + name]: value } );
    }

   } // end handleTextChange()

   handleDropdownChange( name, value )
   {
    global.davelogit( "TheForm.handleDropdownChange()" );

    if ( name == "category" )
    {
      this.setState(
        {
          ["field_" + name]: value,
          field_subcategory: "",
        }
      );
    }
    else
    {
      this.setState( { ["field_" + name]: value } );
    }
   } // end handleDropdownChange()

  render() {
    global.davelogit( "TheForm.render()" );

    let categories, subcategories;
    categories = global.categories;
    if ( this.state.field_category )
      subcategories = global.subcategories[this.state.field_category];
    else
      subcategories = { sortorder:[], items:[] };
    return (
      <React.Fragment>
        <form className={this.props.classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid container direction="row">
            <Grid item xs={11}>
              <TextField
                autoFocus required fullWidth
                className={this.props.classes.textField}
                value={this.state.field_title}
                onChange={this.handleTextChange}
                id="title"
                label="Title"
                margin="dense"
                variant="outlined"
                InputLabelProps={{
                  shrink: true, }}
              />
            </Grid>
            <Grid item xs={11}>
                <TextField
                  multiline fullWidth
                  className={this.props.classes.textField}
                  value={this.state.field_desc}
                  onChange={this.handleTextChange}
                  id="desc"
                  label="Description"
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
            </Grid>
            <Grid item xs={11}>
              <FieldSimpleDropdown
                  title="Category"
                  name="category"
                  value={this.state.field_category}
                  values={categories}
                  onNewValue={this.handleDropdownChange}
                  />
            </Grid>
            <Grid item xs={11}>
              <FieldSimpleDropdown
                  title="Subcategory"
                  name="subcategory"
                  value={this.state.field_subcategory}
                  values={subcategories}
                  onNewValue={this.handleDropdownChange}
                  />
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  } // end render()
} // end class TheForm_unstyled

TheForm_unstyled.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TheForm = withStyles(stylesTheForm)(TheForm_unstyled);

// -------------------------------------------------------------------------------
// (exported) PageControlled1...
// -------------------------------------------------------------------------------

class PageControlled1 extends React.Component
{
  constructor(props) {
    super(props);

    global.davelogit( "PageControlled1.constructor()" );

    this.state = {
      msdelay: parseInt( this.props.match.params.lagms, 10 ),
    };

    //alert( "route params: " + Object.keys(this.props.match.params).join(" ") );
    //alert( "route param: " + this.props.match.params.msdelay );
    //alert( "converted from route param: " + this.state.msdelay );

    //this.msdelay = parseInt( this.props.match.params.msdelay, 10 );

    this.form = React.createRef();

    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleSave = this.handleSave.bind(this);
  } // end constructor()

  handleGoBack() {
    global.davelogit( "PageControlled1.handleGoBack()" );
    // TODO: put up unsaved changes dialog...
    this.props.history.goBack();
  }

  handleSave() {
    global.davelogit( "PageControlled1.handleSave()" );

    let values, msg;

    values = this.form.current.getFormValues();
    msg = `title=${values.title}\ndesc=${values.desc}\ncategory=${values.category}\nsubcategory=${values.subcategory}`

    alert( msg + "\nSaved." );
    this.handleGoBack();
  }

  render() {
    global.davelogit( "PageControlled1.render()" );

    return (
      <div style={{marginTop:80}}>
        <TheAppBar title="Controlled Form Fields Test 1"
          onGoBack={this.handleGoBack}
          onSave={this.handleSave}/>
        <TheForm msdelay={this.state.msdelay} ref={this.form}/>
      </div>
    );
  } // end render()
}

export default PageControlled1;