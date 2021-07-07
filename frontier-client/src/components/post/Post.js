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
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
	card: {
		position: "relative",
		display: "flex",
		marginBottom: 20,
	},
	image: {
		minWidth: 200,
	},
	content: {
		padding: 25,
		objectFit: "cover",
	},
};

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
				<CardMedia
					image={userImage}
					title="Profile Image"
					className={classes.image}
				/>
				<CardContent className={classes.content}>
					<Typography
						variant="h5"
						component={Link}
						to={`/users/${userHandle}`}
						color="primary"
					>
						{userHandle}
					</Typography>

					{deleteButton}

					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>

					<Typography variant="body1">{body}</Typography>

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
				</CardContent>
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
