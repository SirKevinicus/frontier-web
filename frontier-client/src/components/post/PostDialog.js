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
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
import { Fragment } from "react-is";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	profileImage: {
		maxWidth: 200,
		width: theme.spacing(8),
		height: theme.spacing(8),
		borderRadius: "50%",
		objectFit: "cover",
		marginRight: 20,
	},
	dialogContent: {
		padding: 20,
	},
	divider: {
		width: "100%",
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
	body: {
		marginBottom: 20,
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

	// when like is called, it returns a post without "comments" included. Comments are added in Post.js when handleClickOpen is called.
	// a Redux call is made to getPost(postId), which adds the comments in.

	const handleClose = () => {
		onClose();
	};

	const dialogMarkup = loading ? (
		<div className={classes.spinnerDiv}>
			<CircularProgress size={200} thickness={2} />
		</div>
	) : open ? (
		<Fragment>
			<DialogTitle>
				{
					<Grid container>
						<Grid item sm={2}>
							<img
								src={userImage}
								alt="Profile"
								className={classes.profileImage}
							/>
						</Grid>
						<Grid container item sm={10}>
							<Grid item sm={12}>
								<Typography
									component={Link}
									color="textPrimary"
									variant="h5"
									style={{ fontWeight: 500 }}
									to={`/users/${userHandle}`}
								>
									{userHandle}
								</Typography>
							</Grid>
							<Grid item sm={12}>
								<Typography color="primary" variant="body1">
									{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				}
			</DialogTitle>
			<DialogContent>
				<Typography variant="body1" className={classes.body}>
					{body}
				</Typography>

				<LikeButton postId={postId} />
				<span>{likeCount} Likes</span>

				<MyButton tip="comments">
					<ChatIcon color="primary" />
				</MyButton>
				<span>{commentCount} Comments</span>

				<Divider
					className={classes.visibleSeparator}
					variant="fullWidth"
					light
				/>

				<CommentForm postId={postId} />
				<Comments comments={comments} />
			</DialogContent>
		</Fragment>
	) : null;

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
