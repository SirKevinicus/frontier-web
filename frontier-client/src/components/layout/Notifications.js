import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

// ICONS
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

const styles = (theme) => ({
	...theme.spreadThis,
	navItemText: {
		color: theme.palette.background.default,
		fontSize: "1.3rem",
		fontWeight: "bold",
	},
});

class Notifications extends Component {
	state = {
		anchorEl: null,
	};
	handleOpen = (event) => {
		this.setState({ anchorEl: event.target });
	};
	handleClose = () => {
		this.setState({ anchorEl: null });
	};
	onMenuOpened = () => {
		let unreadNotificationsIds = this.props.notifications
			.filter((noti) => !noti.read)
			.map((noti) => noti.notificationId);
		this.props.markNotificationsRead(unreadNotificationsIds);
	};
	render() {
		const { classes } = this.props;

		dayjs.extend(relativeTime);
		const notifications = this.props.notifications;
		const anchorEl = this.state.anchorEl;

		let notificationsIcon;
		if (notifications && notifications.length > 0) {
			notifications.filter((not) => not.read === false).length > 0
				? (notificationsIcon = (
						<Badge
							badgeContent={
								notifications.filter((not) => not.read === false).length
							}
							color="secondary"
						>
							<NotificationsIcon fontSize="large" className={classes.navLogo} />
						</Badge>
				  ))
				: (notificationsIcon = (
						<NotificationsIcon fontSize="large" className={classes.navLogo} />
				  ));
		} else {
			notificationsIcon = (
				<NotificationsIcon fontSize="large" className={classes.navLogo} />
			);
		}

		let notificationsMarkup =
			notifications && notifications.length > 0 ? (
				notifications.map((noti) => {
					const verb = noti.type === "like" ? "liked" : "commented on";
					const time = dayjs(noti.createdAt).fromNow();
					const iconColor = noti.read ? "primary" : "secondary";
					const icon =
						noti.type === "like" ? (
							<FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
						) : (
							<ChatIcon color={iconColor} style={{ marginRight: 10 }} />
						);
					return (
						<MenuItem key={noti.createdAt} onClick={this.handleClose}>
							{icon}
							<Typography
								component={Link}
								to={`/users/${noti.recipient}/post/${noti.postId}`}
								color="default"
								variant="body1"
							>
								{noti.sender} {verb} your post {time}
							</Typography>
						</MenuItem>
					);
				})
			) : (
				<MenuItem onClick={this.onClose}>You have no notifications</MenuItem>
			);

		return (
			<Fragment>
				<ListItemIcon onClick={this.handleOpen}>
					{notificationsIcon}
				</ListItemIcon>
				<ListItemText
					primary="Notifications"
					classes={{ primary: classes.navItemText }}
				/>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					onEntered={this.onMenuOpened}
				>
					{notificationsMarkup}
				</Menu>
			</Fragment>
		);
	}
}

Notifications.propTypes = {
	markNotificationsRead: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
	withStyles(styles)(Notifications)
);
