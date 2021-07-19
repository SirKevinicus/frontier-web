import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Components
import MyButton from "../../util/MyButton";
import EditDetails from "./EditDetails";

// Redux
import { useSelector } from "react-redux";

// MUI
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// Icons
import EditIcon from "@material-ui/icons/Edit";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
	...theme.spreadThis,
});

const StaticProfile = (props) => {
	const {
		classes,
		profile: { handle, createdAt, imageUrl, bio, website, location },
	} = props;

	const isAuthenticatedUser =
		useSelector((state) => state.user).credentials.handle === handle;

	// when the edit button is clicked, this is called and finds the input field and clicks it
	const handleEditPicture = () => {
		const fileInput = document.getElementById("imageInput");
		fileInput.click();
	};

	const handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append("image", image, image.name);
		this.props.uploadImage(formData);
	};

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={imageUrl} alt="profile" className="profile-image" />
					{isAuthenticatedUser ? (
						<Fragment>
							<input
								type="file"
								id="imageInput"
								hidden="hidden"
								onChange={handleImageChange}
							/>
							<MyButton
								tip="Edit Profile Picture"
								onClick={handleEditPicture}
								btnClassName="button"
							>
								<EditIcon color="secondary" />
							</MyButton>
						</Fragment>
					) : null}
				</div>
				<hr />
				<div className="profile-details">
					<MuiLink
						component={Link}
						to={`/users/${handle}`}
						color="primary"
						variant="h5"
					>
						@{handle}
					</MuiLink>
					<hr />
					{bio && <Typography variant="body2">{bio}</Typography>}
					<hr />
					{location && (
						<Fragment>
							<LocationOn color="primary" /> <span>{location}</span>
							<hr />
						</Fragment>
					)}
					{website && (
						<Fragment>
							<LinkIcon color="primary" />
							<a href={website} target="_blank" rel="noopener noreferrer">
								{" "}
								{website}
							</a>
							<hr />
						</Fragment>
					)}
					<CalendarToday color="primary" />{" "}
					<span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
					{isAuthenticatedUser ? <EditDetails /> : null}
				</div>
			</div>
		</Paper>
	);
};

StaticProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
