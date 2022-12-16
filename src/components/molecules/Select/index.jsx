import { FormControl, InputLabel, Select } from "@material-ui/core";
import React from "react";

const SelectMolecules = () => {
  const [state, setState] = React.useState({
    kabupaten: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="kabupaten">Kabupaten</InputLabel>
      <Select
        native
        value={state.kabupaten}
        onChange={handleChange}
        label="Kabupaten"
        inputProps={{
          name: "kabupaten",
          id: "kabupaten",
        }}
      >
        <option aria-label="None" value="" />
        <option value={10}>Bulukumba</option>
        <option value={20}>Bone</option>
        <option value={30}>Gowa</option>
      </Select>
    </FormControl>
  );
};

export default SelectMolecules;
