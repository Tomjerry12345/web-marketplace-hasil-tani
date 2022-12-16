import React from "react";
import Typography from "@material-ui/core/Typography";
import { LinkAtoms } from "../../atoms";

const Footer = () => {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <LinkAtoms title={"Your Website"} color="inherit" href="https://material-ui.com/" />
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
};

export default Footer;
