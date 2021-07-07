import {
	SET_POSTS,
	SET_POST,
	LIKE_POST,
	UNLIKE_POST,
	SUBMIT_POST,
	LOADING_DATA,
	DELETE_POST,
	SUBMIT_COMMENT,
} from "../types";

const initialState = {
	posts: [],
	post: {},
	loading: false,
};

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};
		case SET_POST:
			return {
				...state,
				post: action.payload,
			};
		case SUBMIT_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};
		case LIKE_POST:
		case UNLIKE_POST:
			let index = state.posts.findIndex(
				(post) => post.postId === action.payload.postId
			);
			state.posts[index] = action.payload;
			// check the singular post in the state to update that one too
			if (state.post.postId === action.payload.postId) {
				state.post = action.payload;
			}
			return {
				...state,
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: [action.payload, ...state.post.comments],
				},
			};
		case DELETE_POST:
			index = state.posts.findIndex((post) => post.postId === action.payload);
			state.posts.splice(index, 1);
			return { ...state };
		default:
			return state;
	}
}
