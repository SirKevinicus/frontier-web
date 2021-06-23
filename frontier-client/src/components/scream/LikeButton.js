import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

import MyButton from "../../util/MyButton";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

export class LikeButton extends Component {
	likedScream = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				(like) => like.screamId === this.props.screamId
			)
		)
			return true;
		else return false;
	};
	likeScream = () => {
		this.props.likeScream(this.props.screamId);
	};
	unlikeScream = () => {
		this.props.unlikeScream(this.props.screamId);
	};
	render() {
		const { authenticated } = this.props.user;
		const likeButton = !authenticated ? (
			<Link to="/login">
				<MyButton tip="like">
					<FavoriteBorderIcon color="primary" />
				</MyButton>
			</Link>
		) : this.likedScream() ? (
			<MyButton tip="unlike" onClick={this.unlikeScream}>
				<FavoriteIcon color="primary" />
			</MyButton>
		) : (
			<MyButton tip="like" onClick={this.likeScream}>
				<FavoriteBorderIcon color="primary" />
			</MyButton>
		);
		return likeButton;
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = {
	likeScream,
	unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
