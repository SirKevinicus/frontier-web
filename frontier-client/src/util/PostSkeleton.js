import React, { Fragment } from "react";
import NoImg from "../images/no-img.webp";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

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
		marginBottom: 7,
	},
	date: {
		width: 100,
		height: 15,
		backgroundColor: "#cfcfcf",
		marginBottom: 20,
	},
	fullLine: {
		height: 10,
		width: "90%",
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

const PostSkeleton = (props) => {
	const { classes } = props;

	const content = Array.from({ length: 5 }).map((item, index) => (
		<Card className={classes.card} key={index}>
			<CardMedia className={classes.cover} image={NoImg} />
			<CardContent className={classes.cardContent}>
				<div className={classes.handle}></div>
				<div className={classes.date}></div>
				<div className={classes.fullLine}></div>
				<div className={classes.fullLine}></div>
				<div className={classes.halfLine}></div>
			</CardContent>
		</Card>
	));

	return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostSkeleton);
