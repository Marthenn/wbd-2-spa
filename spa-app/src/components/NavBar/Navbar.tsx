import styles from "./navbar.module.css";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import logo from "../../assets/logo.svg";
import { Link } from 'react-router-dom'; // Import Link

const Navbar = ({
    category,
    username,
    userPhoto,
}: {
    category: string;
    username: string;
    userPhoto: string;
}) => {
    let menuItems: string[][] = [];

    // Customize menu items based on the category
    if (category === 'user') {
      menuItems = [
        ['Audio Books', '/AudioBooks'],
        ['Saved Books', '/SavedBooks'],
      ];
    } else if (category === 'admin') {
      menuItems = [
        ['Edit Transcript', '/admin/EditTranscript'],
        ['Membership Requests', '/admin/MembershipRequests'],
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
                        <Link to={menuItem[1]} key={menuItem[0]}>
                            {menuItem[0]}
                        </Link>
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
                    <Link to={category === 'user' ? "/Profile" : "/admin/Profile" }className={styles.userName}> {username} </Link>
                </div>
            </Toolbar>
      </AppBar>
    );
};

export default Navbar;
