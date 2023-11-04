import styles from "./navbar.module.css";
import { AppBar, Button, Toolbar } from "@mui/material";
import logo from "../../assets/logo.svg";

const NavbarSignIn = ({}: {}) => {
  return (
    <AppBar
    position="static"
    color="secondary"
    elevation={0}
    sx={{
      boxShadow: '2px 5px 10px rgba(0, 0, 0, 0.05)',
    }}
  >
    <Toolbar sx={{ flexWrap: 'wrap' }}>
      <img src={logo} className={styles.logo} alt="Logo"/>
      <Button href="/" variant="outlined" sx={{ my: 1, mx: 1.5, marginLeft: 'auto' }} className={styles.toolBar}>
        Sign In
      </Button>
    </Toolbar>
  </AppBar>
  );
};

export default NavbarSignIn;