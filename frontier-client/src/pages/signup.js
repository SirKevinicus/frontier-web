import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/frontier-logo.png";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

// MUI
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
	...theme.spreadThis,
});

export class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			handle: "",
			errors: {},
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
	}
	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true,
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle,
		};
		this.props.signupUser(newUserData, this.props.history);
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	render() {
		const {
			classes,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img
						src={AppIcon}
						alt="frontier-logo"
						className={classes.frontierLogo}
					/>
					<Typography variant="h2" className={classes.pageTitle}>
						Signup
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Password"
							className={classes.textField}
							value={this.state.password}
							onChange={this.handleChange}
							helperText={errors.password}
							error={errors.password ? true : false}
							fullWidth
						/>
						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="Confirm Password"
							className={classes.textField}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							fullWidth
						/>
						<TextField
							id="handle"
							name="handle"
							type="text"
							label="Handle"
							className={classes.textField}
							value={this.state.handle}
							onChange={this.handleChange}
							helperText={errors.handle}
							error={errors.handle ? true : false}
							fullWidth
						/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loading}
						>
							Sign Up
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
						<br></br>
						<small>
							Already have an account? <Link to="/login">Login</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateWithProps = (state) => ({
	user: state.user,
	UI: state.UI,
});

const mapActionsWithProps = {
	signupUser,
};

signup.propTypes = { classes: PropTypes.object.isRequired };
export default connect(
	mapStateWithProps,
	mapActionsWithProps
)(withStyles(styles)(signup));
