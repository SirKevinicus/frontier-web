import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Components
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	profileImage: {
		maxWidth: 200,
		width: 200,
		height: 200,
		borderRadius: "50%",
		objectFit: "cover",
	},
	dialogContent: {
		padding: 20,
	},
	closeButton: {
		position: "absolute",
		left: "90%",
	},
	expandButton: {
		position: "absolute",
		left: "90%",
	},
	spinnerDiv: {
		textAlign: "center",
		marginTop: 50,
		marginBottom: 50,
	},
}));

export default function PostDialog(props) {
	const classes = useStyles();
	const { onClose, open } = props;

	// GET POST FROM REDUX STORE. The post is set in the store in the Post's onClickOpen action hook
	const {
		postId,
		body,
		createdAt,
		likeCount,
		commentCount,
		userImage,
		userHandle,
		comments,
	} = useSelector((state) => state.data.post);

	const { loading } = useSelector((state) => state.UI);

	const handleClose = () => {
		onClose();
	};

	const dialogMarkup = loading ? (
		<div className={classes.spinnerDiv}>
			<CircularProgress size={200} thickness={2} />
		</div>
	) : (
		<Grid container spacing={16}>
			<Grid item sm={5}>
				<img src={userImage} alt="Profile" className={classes.profileImage} />
			</Grid>
			<Grid item sm={7}>
				<Typography
					component={Link}
					color="primary"
					variant="h5"
					to={`/users/${userHandle}`}
				>
					@{userHandle}
				</Typography>

				<hr className={classes.invisibleSeparator} />

				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
				</Typography>

				<hr className={classes.invisibleSeparator} />

				<Typography variant="body1">{body}</Typography>

				<LikeButton postId={postId} />
				<span>{likeCount} Likes</span>

				<MyButton tip="comments">
					<ChatIcon color="primary" />
				</MyButton>
				<span>{commentCount} Comments</span>
			</Grid>

			<hr className={classes.visibleSeparator} />
			<CommentForm postId={postId} />
			<Comments comments={comments} />
		</Grid>
	);

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
			<MyButton
				tip="Close"
				onClick={handleClose}
				tipClassName={classes.closeButton}
			>
				<CloseIcon />
			</MyButton>
			<DialogContent className={classes.dialogContent}>
				{dialogMarkup}
			</DialogContent>
		</Dialog>
	);
}

PostDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	userHandle: PropTypes.string.isRequired,
};
