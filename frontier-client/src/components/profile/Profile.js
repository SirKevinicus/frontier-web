import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import EditDetails from "./EditDetails";

// Components
import MyButton from "../../util/MyButton";
import ProfileSkeleton from "../../util/ProfileSkeleton";

// MUI
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
	...theme.spreadThis,
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
});

class Profile extends Component {
	handleLogout = () => {
		this.props.logoutUser();
	};

	render() {
		const {
			classes,
			user: {
				credentials: { handle, createdAt, imageUrl, bio, website, location },
				loading,
				authenticated,
			},
		} = this.props;

		let profileMarkup = !loading ? (
			authenticated ? (
				<Card className={classes.paper}>
					<CardHeader
						avatar={
							<Avatar
								aria-label="profile-image"
								className={classes.avatar}
								src={imageUrl}
								component={Link}
								className={classes.avatar}
								to={`/users/${handle}`}
							/>
						}
						title={
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								color="primary"
								variant="h5"
							>
								@{handle}
							</MuiLink>
						}
						subheader={
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								color="primary"
								variant="body1"
							>
								@{handle}
							</MuiLink>
						}
						action={
							<MyButton tip="Logout" onClick={this.handleLogout}>
								<KeyboardReturn color="primary" />
							</MyButton>
						}
					/>
				</Card>
			) : (
				<Paper className={classes.paper}>
					<div className={classes.buttons}>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/login"
						>
							Login
						</Button>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/signup"
						>
							Signup
						</Button>
					</div>
				</Paper>
			)
		) : (
			<ProfileSkeleton />
		);

		return profileMarkup;
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Profile));
