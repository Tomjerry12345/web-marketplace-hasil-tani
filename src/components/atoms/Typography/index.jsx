import React from "react";
import Typography from "@material-ui/core/Typography";

const TypographyAtoms = ({ title, ...rest }) => {
  return <Typography {...rest}>{title}</Typography>;
};

export default TypographyAtoms;
