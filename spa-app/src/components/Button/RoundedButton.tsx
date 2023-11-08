import React from "react";
import styles from "./button.module.css";
import { Button } from "@mui/material";

const RoundedButton = ({
  text,
  onClickFunction,
  disabled = false,
  color,
  icon = "",
}: {
  text: string;
  onClickFunction: (e: React.SyntheticEvent) => void;
  disabled?: boolean;
  color: string;
  icon?: string;
}) => {
  return (
    <Button
      className={styles[color]}
      type="button"
      onClick={onClickFunction}
      disabled={disabled}
      startIcon={icon === "" ? null :  <img src={icon} alt="icon" />}
    >
      {text}
    </Button>
  );
};

export default RoundedButton;
