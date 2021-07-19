import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	commentImage: {
		height: theme.spacing(8),
		width: theme.spacing(8),
		objectFit: "cover",
		borderRadius: "50%",
	},
	commentData: {
		marginLeft: 20,
	},
}));

function Comment(props) {
	const classes = useStyles();
	const { body, createdAt, userImage, userHandle } = props.comment;

	return (
		<Grid container>
			<Grid item sm={2}>
				<img src={userImage} alt="comment" className={classes.commentImage} />
			</Grid>
			<Grid item sm={9}>
				<div className={classes.commentData}>
					<Typography
						variant="h5"
						component={Link}
						to={`/users/${userHandle}`}
						color="primary"
					>
						@{userHandle}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body1">{body}</Typography>
				</div>
			</Grid>
		</Grid>
	);
}

export default Comment;
