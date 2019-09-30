import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FieldSimpleDropdown(props)
{
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(event) {
    props.onNewValue( props.name, event.target.value );
    return;
  }

  const menuitems = props.values.sortorder.map( index => {
    return (<MenuItem value={props.values.items[index]} key={index}>
              {props.values.items[index]}
            </MenuItem>)
  });

  global.davelogit( "FieldSimpleDropdown() rendering - " + props.title );

  return (
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} >
          {props.title}
        </InputLabel>
        <Select
          inputRef={props.inputRef}
          value={props.value}
          onChange={handleChange}
          input={<OutlinedInput labelWidth={labelWidth} />}
        >
          {menuitems}
        </Select>
      </FormControl>
  );
}

export default FieldSimpleDropdown;