import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/frontier-logo.png";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

// MUI
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
	...theme.spreadThis,
	loginForm: {
		textAlign: "center",
		padding: "0 50px",
	},
	button: {
		margin: "20px auto",
	},
});

export class login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
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
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(userData, this.props.history);
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
			<Container maxWidth="sm" className={classes.loginForm}>
				<img
					src={AppIcon}
					alt="frontier-logo"
					className={classes.frontierLogo}
				/>
				<Typography variant="h2" className={classes.pageTitle}>
					Login
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
						Submit
						{loading && (
							<CircularProgress size={30} className={classes.progress} />
						)}
					</Button>
					<br></br>
					<small>
						Don't have an account? <Link to="/signup">Sign up</Link>
					</small>
				</form>
			</Container>
		);
	}
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

// Take what we need from the global state and put them in our props
const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});

const mapActionsToProps = {
	loginUser,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(login));
