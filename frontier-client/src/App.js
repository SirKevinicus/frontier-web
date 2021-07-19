import React from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

// Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
import axios from "axios";

// Mui
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";

// Theme
const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
	"https://us-central1-frontier-54f11.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = "/login";
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common["Authorization"] = token;
		store.dispatch(getUserData());
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appContainer: {
		marginTop: 20,
	},
}));

const App = ({ location }) => {
	const classes = useStyles();

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<div className={classes.root}>
					{location.pathname !== "/login" &&
						location.pathname !== "/signup" && <Navbar />}
					<Container fixed className={classes.appContainer}>
						<Switch>
							<AuthRoute exact path="/login" component={login} />
							<AuthRoute exact path="/signup" component={signup} />
							<Route exact path="/" component={home} />
							<Route exact path="/users/:handle" component={user} />
							<Route
								exact
								path="/users/:handle/scream/:screamId"
								component={user}
							/>
						</Switch>
					</Container>
				</div>
			</Provider>
		</MuiThemeProvider>
	);
};

export default withRouter(App);
