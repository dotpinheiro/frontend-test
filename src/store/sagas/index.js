import { all, takeLatest } from "redux-saga/effects";
import { getPosts, removePost, editPost } from "./posts";
import { Types as PostTypes } from "../ducks/posts";

export default function* rootSaga() {
  yield all([
    takeLatest(PostTypes.GET_POSTS_REQUEST, getPosts),
    takeLatest(PostTypes.REMOVE_POST_REQUEST, removePost),
    takeLatest(PostTypes.EDIT_POST_REQUEST, editPost)
  ]);
}
