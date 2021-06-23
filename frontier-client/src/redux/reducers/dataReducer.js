import {
	SET_SCREAMS,
	SET_SCREAM,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	POST_SCREAM,
	LOADING_DATA,
	DELETE_SCREAM,
	SUBMIT_COMMENT,
} from "../types";

const initialState = {
	screams: [],
	scream: {},
	loading: false,
};

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_SCREAMS:
			return {
				...state,
				screams: action.payload,
				loading: false,
			};
		case SET_SCREAM:
			return {
				...state,
				scream: action.payload,
			};
		case POST_SCREAM:
			return {
				...state,
				screams: [action.payload, ...state.screams],
			};
		case LIKE_SCREAM:
		case UNLIKE_SCREAM:
			let index = state.screams.findIndex(
				(scream) => scream.screamId === action.payload.screamId
			);
			state.screams[index] = action.payload;
			// check the singular scream in the state to update that one too
			if (state.scream.screamId === action.payload.screamId) {
				state.scream = action.payload;
			}
			return {
				...state,
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				scream: {
					...state.scream,
					comments: [action.payload, ...state.scream.comments],
				},
			};
		case DELETE_SCREAM:
			index = state.screams.findIndex(
				(scream) => scream.screamId === action.payload
			);
			state.screams.splice(index, 1);
			return { ...state };
		default:
			return state;
	}
}
