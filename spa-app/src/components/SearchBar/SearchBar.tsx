import React from "react";
import styles from "./searchbar.module.css";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import theme from "../../theme/theme";

const SearchBar = ({
    onChangeFunction,
}: {
    onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <TextField
            className={styles.searchBar}
            sx={{
                "& fieldset": { border: 'none' },
                width: '80%',
                [theme.breakpoints.up('sm')]: {
                  width: '50%',
                },
                [theme.breakpoints.up('md')]: {
                  width: '30%',
                },
                margin: '10px 0',
            }}
            label="Search"
            onChange={onChangeFunction}
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon/>
                    </InputAdornment>
                ),
                style: {
                    height: '40px',
                },
            }}
            InputLabelProps={{
                style: {
                    fontSize: '15px',
                },
            }}
            inputProps={{
                style: {
                    height: '40px',
                },
            }}
            size="small"
        />
    );
};

export default SearchBar;
