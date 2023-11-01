import React from "react";
import styles from "./button.module.css";
import { Button } from "@mui/material";

const RoundedButton = ({
  text,
  onClickFunction,
  disabled,
  color,
}: {
  text: string;
  onClickFunction: (e: React.SyntheticEvent) => void;
  disabled: boolean;
  color: string;
}) => {
  return (
    <Button className={styles[color]} type="button" onClick={onClickFunction} disabled={disabled}>
      {text}
    </Button>
  );
};

export default RoundedButton;
