import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const RadioMolecules = ({ title, mValue, mValue1, ...rest }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup {...rest}>
        <FormControlLabel value={mValue} control={<Radio />} label={mValue} />
        <FormControlLabel value={mValue1} control={<Radio />} label={mValue1} />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioMolecules;
