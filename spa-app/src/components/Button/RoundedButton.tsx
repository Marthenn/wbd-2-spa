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
}: {
  text: string;
  onClickFunction: (e: React.SyntheticEvent) => void;
  disabled?: boolean;
  color: string;
  icon?: SvgIconComponent | null;
}) => {
  return (
    <Button
      className={styles[color]}
      type="button"
      onClick={onClickFunction}
      disabled={disabled}
      startIcon={icon && React.createElement(icon)}
    >
      {text}
    </Button>
  );
};

export default RoundedButton;
