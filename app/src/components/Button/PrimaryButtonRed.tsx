import React from "react";
import styles from "./button.module.css";
import { Button } from "@mui/material";

const PrimaryButtonRed = ({
  text,
  onClickFunction,
  disabled,
}: {
  text: string;
  onClickFunction: (e: React.SyntheticEvent) => void;
  disabled: boolean;
}) => {
    return (
        <Button fullWidth className={styles.primaryButtonRed} type="button" onClick={onClickFunction} disabled={disabled}>
        {text}
        </Button>
    );
};

export default PrimaryButtonRed;