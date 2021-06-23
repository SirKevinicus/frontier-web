import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	MARK_NOTIFICATIONS_READ,
} from "../types";
import axios from "axios";

// -----------------
// LOGIN
// -----------------

export const loginUser = (userData, history) => (dispatch) => {
	// Trigger the loading action
	dispatch({ type: LOADING_UI });
	// Make the post request to login
	axios
		.post("/login", userData)
		// If we get a response, the login was successful
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			// redirects to the home page
			history.push("/");
		})
		// If the login failed, trigger the SET_ERRORS action with the err as a payload
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		});
};

// -----------------
// LOG OUT
// -----------------
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("FBIdToken");
	delete axios.defaults.headers.common["Authorization"];
	dispatch({ type: SET_UNAUTHENTICATED });
};

// -----------------
// GET USER DATA
// -----------------

export const getUserData = () => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.get("/user")
		.then((res) => {
			dispatch({ type: SET_USER, payload: res.data });
		})
		.catch((err) => {
			console.log(err);
		});
};

// -----------------
// SIGN UP
// -----------------

export const signupUser = (newUserData, history) => (dispatch) => {
	// Trigger the loading action
	dispatch({ type: LOADING_UI });
	// Make the post request to login
	axios
		.post("/signup", newUserData)
		// If we get a response, the login was successful
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			// redirects to the home page
			history.push("/");
		})
		// If the login failed, trigger the SET_ERRORS action with the err as a payload
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
		});
};

// -----------------
// UPLOAD IMAGE
// -----------------

export const uploadImage = (formData) => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.post("/user/image", formData)
		.then(() => {
			dispatch(getUserData());
		})
		.catch((err) => {
			console.log(err);
		});
};

// -----------------
// EDIT USER DETAILS
// -----------------
export const editUserDetails = (userDetails) => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.post("/user", userDetails)
		.then(() => {
			dispatch(getUserData());
		})
		.catch((err) => {
			console.log(err);
		});
};

// -----------------
// NOTIFICATIONS
// -----------------
export const markNotificationsRead = (notificationIds) => (dispatch) => {
	axios
		.post("/notifications", notificationIds)
		.then((res) => {
			dispatch({
				type: MARK_NOTIFICATIONS_READ,
			});
		})
		.catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`;
	// stores the token in the local storage (can find in Application/localStorage in dev tools)
	localStorage.setItem("FBIdToken", FBIdToken);
	// sets an Authorization header containing the Firebase ID Token for every request
	axios.defaults.headers.common["Authorization"] = FBIdToken;
};
