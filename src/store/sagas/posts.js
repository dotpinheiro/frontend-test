import api from "../../services/api";
import { call, put } from "redux-saga/effects";
import { Creators as PostActions } from "../ducks/posts";

export function* getPosts(action) {
  try {
    // const { data } = yield call(api.get, "/posts");
    // console.tron.log(data);
    let posts = yield call(api.get, "/posts");
    let users = yield call(api.get, "/users");
    posts = posts.data;
    users = users.data;

    posts = posts.map(post =>
      Object.assign(post, users.find(user => post.userId === user.id), {
        postId: post.id
      })
    );

    yield put(PostActions.getPostsSuccess(posts));
  } catch (err) {
    // yield put (PostActions.getPostsFailure(errors));
  }
}

export function* editPost(action) {
  const { payload } = action;
  try {
    const { data } = yield call(
      api.put,
      `/posts/${payload.post.postId}`,
      payload.post
    );
    yield put(PostActions.editPostSuccess(data));
  } catch (err) {}
}

export function* removePost(action) {
  const { payload } = action;
  try {
    const { data } = yield call(api.delete, `/posts/${payload.id}`);
    console.tron.log(data);
    console.tron.log("payload", payload);
    yield put(PostActions.removePostSuccess(payload.id));
  } catch (err) {}
}
