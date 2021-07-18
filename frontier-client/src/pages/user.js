import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post/Post";

// REDUX
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

// COMPONENTS
import StaticProfile from "../components/profile/StaticProfile";
import PostSkeleton from "../util/PostSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

// MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
	...theme.spreadThis,
});

class user extends Component {
	state = {
		profile: null,
		postIdParam: null,
	};

	componentDidMount() {
		const handle = this.props.match.params.handle;
		const postId = this.props.match.params.postId; // gets the values from the url

		// if a postId is passed in through the url, set it in the state
		if (postId) this.setState({ postIdParam: postId });

		this.props.getUserData(handle);
		axios
			.get(`/user/${handle}`)
			.then((res) => {
				this.setState({
					profile: res.data.user,
				});
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { classes } = this.props;
		const { posts, loading } = this.props.data;
		const { postIdParam } = this.state;

		// 1st case: if loading, display loading
		// 2nd case: if there are no posts, display message
		// 3rd case: if there is not a postIdParam passed through the URL, then display all of the posts for this user
		// 4th case: display all posts for the user, and open the post (input through the postIdParam) using a dialog
		const postsMarkup = loading ? (
			<PostSkeleton />
		) : posts === null || posts.length == 0 ? (
			<Paper className={classes.paper}>
				<Typography variant="body1">
					This user doesn't have any posts!
				</Typography>
			</Paper>
		) : !postIdParam ? (
			posts.map((post) => <Post key={post.postId} post={post} />)
		) : (
			posts.map((post) => {
				if (post.postId !== postIdParam)
					return <Post key={post.postId} post={post} />;
				else return <Post key={post.postId} post={post} openDialog />;
			})
		);

		return (
			<Grid container spacing={2}>
				<Grid item sm={8} xs={12}>
					{postsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					{this.state.profile === null ? (
						<ProfileSkeleton />
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
			</Grid>
		);
	}
}

user.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

export default connect(mapStateToProps, { getUserData })(
	withStyles(styles)(user)
);
