import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import MyButton from "../../util/MyButton";
import SubmitPost from "../post/SubmitPost";
import Notifications from "./Notifications";

// Icons
import { ReactComponent as HomeIcon } from "../../assets/img/home.svg";
import MenuIcon from "@material-ui/icons/Menu";

// Redux
import { connect } from "react-redux";

// MUI (Material UI)
import Hidden from "@material-ui/core/Hidden";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import SvgIcon from "@material-ui/core/SvgIcon";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { render } from "@testing-library/react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	navbarPaper: {
		backgroundColor: theme.palette.primary.main,
		width: drawerWidth,
		padding: "20px 10px 20px 10px",
	},
	menuButton: {
		position: "absolute",
		zIndex: 99,
		margin: 20,
	},
}));

function NavbarContent({ authenticated }) {
	return (
		<List>
			<Link to="/">
				<ListItem button>
					<ListItemIcon>
						<SvgIcon>
							<HomeIcon />
						</SvgIcon>
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
			</Link>
			{authenticated ? (
				<Fragment>
					<ListItem button>
						<SubmitPost />
					</ListItem>
					<ListItem button>
						<Notifications />
					</ListItem>
				</Fragment>
			) : (
				<Fragment>
					<Button color="inherit" component={Link} to="/login">
						<b>Login</b>
					</Button>
					<Button color="inherit" component={Link} to="/signup">
						Signup
					</Button>
				</Fragment>
			)}
		</List>
	);
}

function Navbar({ authenticated }) {
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<nav aria-label="Site Navigation">
			<Hidden smUp implementation="js">
				<Drawer
					variant="temporary"
					anchor={theme.direction === "rtl" ? "right" : "left"}
					open={mobileOpen}
					onClose={handleDrawerToggle}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<NavbarContent authenticated={authenticated} />
				</Drawer>
				<IconButton
					color="primary"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
			</Hidden>

			<Hidden xsDown implementation="js">
				<Drawer
					variant="permanent"
					className={classes.drawer}
					classes={{ paper: classes.navbarPaper }}
					open
				>
					<NavbarContent authenticated={authenticated} />
				</Drawer>
			</Hidden>
		</nav>
	);
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
