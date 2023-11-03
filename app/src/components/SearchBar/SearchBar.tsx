import React from "react";
import styles from "./searchbar.module.css";
import { TextField, InputAdornment} from "@mui/material";
import searchIcon from '../../assets/search.svg';

const SearchBar = ({
    onChangeFunction,
}: {
    onChangeFunction: (e: React.SyntheticEvent) => void;
}) => {
  return (
    <TextField
    className={styles.searchBar}
    sx={{
        "& fieldset": { border: 'none' },
      }}
    label="Search"
    onChange={onChangeFunction}
    variant="outlined"
    InputProps={{
        endAdornment: <InputAdornment position="end">
            <img src={searchIcon} alt="Search"/>
        </InputAdornment>,
      }}
    />
  );
};

export default SearchBar;