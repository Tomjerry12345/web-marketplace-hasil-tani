import React from "react";
import { Link } from "react-router-dom";

const LinkAtoms = ({ title, ...rest }) => {
  return <Link {...rest}>{title}</Link>;
};

export default LinkAtoms;
