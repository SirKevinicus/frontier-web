import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import MyButton from "../../util/MyButton";
import SubmitPost from "../post/SubmitPost";
import Notifications from "./Notifications";

// Icons
import { ReactComponent as HomeIcon } from "../../assets/img/home.svg";

// Redux
import { connect } from "react-redux";

// MUI (Material UI)
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import SvgIcon from "@material-ui/core/SvgIcon";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	navbarDrawer: {
		width: 240,
	},
	navbarPaper: {
		backgroundColor: theme.palette.primary.main,
		width: 240,
	},
}));

function Navbar({ authenticated }) {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Fragment>
			<Drawer
				variant="permanent"
				className={classes.navbarDrawer}
				classes={{ paper: classes.navbarPaper }}
			>
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
			</Drawer>
		</Fragment>
	);
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
