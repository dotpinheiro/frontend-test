import React from "react";
import Post from "../../components/Post";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PostReducer } from "../../store/ducks/posts";
import {
  Container,
  Modal,
  Typography,
  CircularProgress
} from "@material-ui/core";
import EditPostModal from "../../components/Post/EditPostModal";
import useStyle from "./styles";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPostsRequest();
    console.tron.log(this.props);
  }

  renderPosts = () => {
    return this.props.posts.data.map((post, index) => {
      return <Post key={index} post={post}></Post>;
    });
  };

  render() {
    return (
      <Container maxWidth={"sm"}>
        <Typography variant="h2" component="h2">
          Posts
        </Typography>
        {this.props.posts.loading ? <CircularProgress /> : this.renderPosts()}
        <EditPostModal />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(PostReducer, dispatch);

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
