import React from "react";
import styles from "./button.module.css";
import { Button } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

const RoundedButton = ({
  text,
  onClickFunction,
  disabled = false,
  color,
  icon = null,
  fullWidth = false,
}: {
  text: string;
  onClickFunction: (e: React.SyntheticEvent) => void;
  disabled?: boolean;
  color: string;
  icon?: SvgIconComponent | null;
  fullWidth?: boolean;
}) => {
  return (
    <Button
      className={styles[color]}
      type="button"
      onClick={onClickFunction}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={icon && React.createElement(icon)}
    >
      {text}
    </Button>
  );
};

export default RoundedButton;
