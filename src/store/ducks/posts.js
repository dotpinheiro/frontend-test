/**
 * Types
 */

export const Types = {
  OPEN_EDIT_MODAL: "OPEN_EDIT_MODAL",
  CLOSE_EDIT_MODAL: "CLOSE_EDIT_MODAL",
  GET_POSTS_REQUEST: "GET_POSTS_REQUEST",
  GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
  GET_POSTS_FAILURE: "GET_POSTS_FAILURE",
  EDIT_POST_REQUEST: "EDIT_POST_REQUEST",
  EDIT_POST_SUCCESS: "EDIT_POST_SUCCESS",
  EDIT_POST_FAILURE: "EDIT_POST_FAILURE",
  REMOVE_POST_REQUEST: "REMOVE_POST_REQUEST",
  REMOVE_POST_SUCCESS: "REMOVE_POST_SUCCESS",
  REMOVE_POST_FAILURE: "REMOVE_POST_FAILURE"
};

/**
 * Reducer
 */

const INITIAL_STATE = {
  modalOpened: false,
  modalData: {},
  data: []
};

export default function posts(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
    case Types.OPEN_EDIT_MODAL:
      return { ...state, modalOpened: true, modalData: payload };
    case Types.CLOSE_EDIT_MODAL:
      return { ...state, modalOpened: false };
    case Types.GET_POSTS_SUCCESS:
      return { ...state, data: payload };
    case Types.GET_POSTS_FAILURE:
      return { ...state, data: { ...payload } };
    case Types.EDIT_POST_SUCCESS:
      return {
        ...state,
        data: state.data.map((post, index) => {
          if (post.id === payload.post.id) return payload.post;
          else return post;
        })
      };
    case Types.EDIT_POST_FAILURE:
      return state;
    case Types.REMOVE_POST_SUCCESS:
      return {
        ...state,
        data: state.data.filter(post => post.id !== payload.id)
      };
    case Types.REMOVE_POST_FAILURE:
      return state;
    default:
      return state;
  }
}

/**
 * Actions
 */

export const Creators = {
  openEditModal: post => ({
    type: Types.OPEN_EDIT_MODAL,
    payload: post
  }),
  closeEditModal: () => ({
    type: Types.CLOSE_EDIT_MODAL
  }),
  getPostsRequest: params => ({
    type: Types.GET_POSTS_REQUEST,
    payload: params
  }),
  getPostsSuccess: data => ({
    type: Types.GET_POSTS_SUCCESS,
    payload: data
  }),
  getPostsFailure: data => ({
    type: Types.GET_POSTS_FAILURE,
    payload: data
  }),
  editPostRequest: post => ({
    type: Types.EDIT_POST_REQUEST,
    payload: { post }
  }),
  editPostSuccess: post => ({
    type: Types.EDIT_POST_SUCCESS,
    payload: { post }
  }),
  editPostFailure: () => ({
    type: Types.EDIT_POST_FAILURE
  }),
  removePostRequest: id => ({
    type: Types.REMOVE_POST_REQUEST,
    payload: { id }
  }),
  removePostSuccess: id => ({
    type: Types.REMOVE_POST_SUCCESS,
    payload: { id }
  }),
  removePostFailure: data => ({
    type: Types.REMOVE_POST_FAILURE,
    payload: data
  })
};
