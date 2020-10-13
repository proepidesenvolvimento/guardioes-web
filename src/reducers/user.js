import {
	SET_EMAIL,
	SET_TOKEN,
	SET_USER,
	SET_ADMIN_CATEGORIES,
	SET_APPS,
	SET_CONTENTS,
	SET_SYMPTOMS,
	SET_GROUP_MANAGERS,
	SET_GROUPS,
	SET_SYNDROMES,
	SET_USERS
} from 'constants/action-types';

const initialState = {
	email: "",
	token: "",
	user: {},
	admin_categories: {
		config_app: false,
		manager: false,
		users: false,
		symptoms: false,
		syndromes: false,
		contents: false,
		dashboard: false,
		group_managers: false,
		groups: false
	},
	apps: [],
	contents: [],
	symptoms: [],
	group_managers: [],
	groups: [],
	syndromes: [],
	users: []
};

const User = (state = initialState, action) => {
	switch (action.type) {
		case SET_EMAIL:
			return {
				...state,
				email: action.payload,
			};
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};
		case SET_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		case SET_ADMIN_CATEGORIES:
			return {
				...state,
				admin_categories: action.payload,
			};
		case SET_APPS:
			return {
				...state,
				apps: action.payload
			};
		case SET_CONTENTS:
			return {
				...state,
				contents: action.payload
			};
		case SET_SYMPTOMS:
			return {
				...state,
				symptoms: action.payload
			};
		case SET_GROUP_MANAGERS:
			return {
				...state,
				group_managers: action.payload
			};
		case SET_SYNDROMES:
			return {
				...state,
				syndromes: action.payload
			};
		case SET_USERS:
			return {
				...state,
				users: action.payload
			};
		case SET_GROUPS:
			return {
				...state,
				groups: action.payload
			};
		default:
			return {
				...state,
			};
	}
};

export default User;
