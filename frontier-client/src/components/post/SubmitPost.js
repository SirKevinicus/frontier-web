import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";
import { submitPost, clearErrors } from "../../redux/actions/dataActions";

// Components
import MyButton from "../../util/MyButton";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { DialogContent } from "@material-ui/core";

const styles = (theme) => ({
	...theme.spreadThis,
	submitButton: {
		position: "relative",
		float: "right",
		marginTop: 10,
		marginBottom: 10,
	},
	progressSpinner: {
		position: "absolute",
	},
	closeButton: {
		position: "absolute",
		left: "90%",
		top: "6%",
	},
});

class SubmitPost extends Component {
	state = {
		open: false,
		body: "",
		errors: {},
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors,
			});
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: "", open: false, errors: {} });
		}
	}

	handleOpen = () => {
		this.setState({
			open: true,
		});
	};

	handleClose = () => {
		this.props.clearErrors();
		this.setState({ open: false, errors: {} });
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.submitPost({ body: this.state.body });
		//this.handleClose();
	};

	render() {
		const { errors } = this.state;
		const {
			classes,
			UI: { loading },
		} = this.props;
		return (
			<Fragment>
				<MyButton tip="Create Post" onClick={this.handleOpen}>
					<AddIcon color="primary" />
				</MyButton>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<MyButton
						tip="Close"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon />
					</MyButton>
					<DialogTitle>Create a New Post</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								type="text"
								label="Text"
								multiline
								rows="3"
								placeholder="Say whatever you want"
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progressSpinner}
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	UI: state.UI,
});

SubmitPost.propTypes = {
	submitPost: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { submitPost, clearErrors })(
	withStyles(styles)(SubmitPost)
);
