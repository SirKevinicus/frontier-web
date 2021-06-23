import React, { Fragment } from "react";
import NoImg from "../images/no-img.webp";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
	...theme.spreadThis,
	card: {
		display: "flex",
		marginBottom: 20,
	},
	cardContent: {
		width: "100%",
		flexDirection: "column",
		padding: 25,
	},
	cover: {
		minWidth: 200,
		objectFit: "cover",
	},
	handle: {
		width: 180,
		height: 20,
		backgroundColor: theme.palette.primary.main,
		margin: "0 auto 7px auto",
	},
	date: {
		width: 100,
		height: 15,
		backgroundColor: "#cfcfcf",
		marginBottom: 20,
	},
	fullLine: {
		height: 10,
		width: "100%",
		marginBottom: 10,
		backgroundColor: "#cfcfcf",
	},
	halfLine: {
		height: 10,
		width: "50%",
		marginBottom: 10,
		backgroundColor: "#cfcfcf",
	},
});

const ProfileSkeleton = (props) => {
	const { classes } = props;

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={NoImg} alt="profile" className="profile-image" />
				</div>
				<hr />
				<div className="profile-details">
					<div className={classes.handle} />
					<hr />
					<div className={classes.fullLine} />
					<div className={classes.fullLine} />
					<hr />
					<LocationOn color="primary" />
					<span>Location</span>
					<hr />
					<LinkIcon color="primary" /> https://website.com
					<hr />
					<CalendarToday color="primary" /> Joined date
				</div>
			</div>
		</Paper>
	);
};

ProfileSkeleton.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
