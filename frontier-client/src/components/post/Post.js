import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useSelector, useDispatch } from "react-redux";

// Redux
import { getPost, clearErrors } from "../../redux/actions/dataActions";

// Components
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme) => ({
	...theme.spreadThis,
	card: {
		position: "relative",
		marginBottom: 20,
		padding: 10,
		"&:hover": {
			backgroundColor: theme.palette.grey[50],
		},
	},
	actionArea: {
		"&:hover $focusHighlight": {
			opacity: 0,
		},
	},
	focusHighlight: {},
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
	content: {
		margin: 0,
		padding: "10px 20px 10px",
		objectFit: "cover",
	},
	userHandle: {
		fontWeight: 3,
	},
}));

export default function Post(props) {
	dayjs.extend(relativeTime);

	// HOOKS
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [oldPath, setOldPath] = useState("");

	// STYLES
	const classes = useStyles();

	// POST
	const { post } = props;
	const {
		body,
		createdAt,
		userImage,
		userHandle,
		postId,
		likeCount,
		commentCount,
	} = post;

	// USER
	const {
		authenticated,
		credentials: { handle },
	} = useSelector((state) => state.user);

	const handleClickOpen = () => {
		setOpen(true);

		let oldPath = window.location.pathname;
		let newPath = `/users/${userHandle}/post/${postId}`;

		setOldPath(oldPath);

		// if url is pasted in (oldPath will be null), set the old path to the user's page
		if (oldPath === newPath) setOldPath(`/users/${userHandle}`);

		// set (data, title, url) in the browser
		window.history.pushState(null, null, newPath);

		// Sets the post in Redux store
		dispatch(getPost(postId));
	};

	const handleClose = () => {
		console.log("HANDLE CLOSE");
		setOpen(false);
		window.history.pushState(null, null, oldPath);
		dispatch(clearErrors());
	};

	// If the URL already matches, user.js will pass the openDialog prop to Post.
	// When received, we need to reopen the post dialog and set the Post in the Redux store.
	useEffect(() => {
		function reopenDialog() {
			setOpen(true);
			dispatch(getPost(postId));
		}
		if (props.openDialog) reopenDialog();
	}, [props.openDialog, dispatch, postId]);

	const deleteButton =
		authenticated && userHandle === handle ? (
			<DeletePost postId={postId} />
		) : null;

	return (
		<Card className={classes.card}>
			<CardHeader
				avatar={
					<Avatar
						aria-label="recipe"
						className={classes.avatar}
						src={userImage}
						component={Link}
						to={`/users/${userHandle}`}
					></Avatar>
				}
				action={
					<div>
						{deleteButton}
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					</div>
				}
				title={
					<Link to={`/users/${userHandle}`}>
						<Typography
							variant="h6"
							className={classes.userHandle}
							color="textPrimary"
							display="inline"
						>
							{userHandle}
						</Typography>
					</Link>
				}
				subheader={dayjs(createdAt).fromNow()}
			/>
			<CardActionArea
				onClick={handleClickOpen}
				classes={{
					root: classes.actionArea,
					focusHighlight: classes.focusHighlight,
				}}
			>
				<CardContent className={classes.content}>
					<Typography variant="body1">{body}</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<LikeButton postId={postId} />
				<span>{likeCount} Likes</span>

				<MyButton tip="comments" onClick={handleClickOpen}>
					<ChatIcon color="primary" />
				</MyButton>
				<span>
					{commentCount} Comment{commentCount !== 1 ? "s" : null}{" "}
				</span>

				<PostDialog userHandle={userHandle} open={open} onClose={handleClose} />
			</CardActions>
		</Card>
	);
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
};
