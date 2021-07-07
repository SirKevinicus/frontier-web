import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import MyButton from "../../util/MyButton";
import SubmitPost from "../post/SubmitPost";
import Notifications from "./Notifications";

// Redux
import { connect } from "react-redux";

// MUI (Material UI)
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";

export class Navbar extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<SubmitPost />
							<Link to="/">
								<MyButton tip="Home">
									<HomeIcon />
								</MyButton>
							</Link>
							<Notifications />
						</Fragment>
					) : (
						<Fragment>
							<Button color="inherit" component={Link} to="/login">
								<b>Login</b>
							</Button>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								Signup
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
