import React from "react";
import Button from "@material-ui/core/Button";

const ButtonAtoms = ({ title, ...rest }) => {
  return <Button {...rest}>{title}</Button>;
};

export default ButtonAtoms;
