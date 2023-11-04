import styles from "./navbar.module.css";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";

const Navbar = ({
    category,
    username,
    userPhoto,
}: {
    category: string;
    username: string;
    userPhoto: string;
}) => {
    let menuItems: string[] = [];

    // Customize menu items based on the category
    if (category === 'user') {
      menuItems = [
        'Audio Books',
      ];
    } else if (category === 'admin') {
      menuItems = [
        'Edit Transcript',
        'Membership Requests',
      ];
    }
    return (
        <AppBar
            position="fixed"
            color="secondary"
            elevation={0}
            sx={{
                boxShadow: '2px 5px 10px rgba(0, 0, 0, 0.05)',
            }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <div className={styles.menu}>
                    <img src={logo} className={styles.logo} alt="Logo"/>
                    {menuItems.map((menuItem) => (
                    <a href="" key={menuItem}>
                        {menuItem}
                    </a>
                    ))}
                </div>
                <div className={styles.userInfo}>
                    {userPhoto ? (
                        <Avatar sx={{ width: 25, height: 25 }}>
                        <img src={userPhoto} alt="User" />
                        </Avatar>
                    ) : (
                        <Avatar sx={{ width: 25, height: 25 }}>
                        {username.charAt(0).toUpperCase()}
                        </Avatar>
                    )}
                    <a href="" className={styles.userName}> {username} </a>
                </div>
            </Toolbar>
      </AppBar>
    );
};

export default Navbar;