import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";

// Components
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";

// MUI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = (theme) => ({
	...theme.spreadThis,
	card: {
		position: "relative",
		marginBottom: 20,
		padding: 10,
	},
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
});

class Post extends Component {
	render() {
		dayjs.extend(relativeTime);

		const {
			classes,
			post: {
				body,
				createdAt,
				userImage,
				userHandle,
				postId,
				likeCount,
				commentCount,
			},
			user: {
				authenticated,
				credentials: { handle },
			},
		} = this.props;

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
				<CardContent className={classes.content}>
					<Typography variant="body1">{body}</Typography>
				</CardContent>
				<CardActions>
					<LikeButton postId={postId} />
					<span>{likeCount} Likes</span>

					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} Comments</span>

					<PostDialog
						postId={postId}
						userHandle={userHandle}
						openDialog={this.props.openDialog}
					/>
				</CardActions>
			</Card>
		);
	}
}

Post.propTypes = {
	user: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Post));
