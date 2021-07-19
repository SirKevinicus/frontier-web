import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Comment from "./Comment";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
}));

export default function Comments(props) {
	const classes = useStyles();
	const { comments } = props;

	const content = props.comments.map((comment, index) => (
		<Grid item sm={12} key={comment.createdAt}>
			<Comment comment={comment} />
			{index !== comments.length - 1 && (
				<hr className={classes.invisibleSeparator} />
			)}
		</Grid>
	));

	return <Grid container>{content}</Grid>;
}

Comments.propTypes = {
	comments: PropTypes.array,
};
