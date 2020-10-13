import {
  LOAD_MAKES,
  SET_TOKEN,
  SET_USER,
  SET_EMAIL,
  SET_ADMIN_CATEGORIES,
  SET_APPS,
  SET_SYMPTOMS,
  SET_CONTENTS,
  SET_GROUP_MANAGERS,
  SET_GROUPS,
  SET_SYNDROMES,
  SET_USERS
} from 'constants/action-types';

export const loadMakes = (payload) => ({ type: LOAD_MAKES, payload });

export const setToken = (payload) => ({ type: SET_TOKEN, payload });

export const setEmail = (payload) => ({ type: SET_EMAIL, payload });

export const setUser = (payload) => ({ type: SET_USER, payload });

export const setAdminCategories = (payload) => ({ type: SET_ADMIN_CATEGORIES, payload });

export const setApps = (payload) => ({ type: SET_APPS, payload });

export const setSymptoms = (payload) => ({ type: SET_SYMPTOMS, payload });

export const setContents = (payload) => ({ type: SET_CONTENTS, payload });

export const setGroupManagers = (payload) => ({ type: SET_GROUP_MANAGERS, payload });

export const setGroups = (payload) => ({ type: SET_GROUPS, payload });

export const setSyndromes = (payload) => ({ type: SET_SYNDROMES, payload });

export const setUsers = (payload) => ({ type: SET_USERS, payload });
