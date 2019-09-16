import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Modal, Backdrop, Fade, TextField, Button } from "@material-ui/core";
import { Creators as PostReducer } from "../../../store/ducks/posts";
import useStyles from "./styles";

const EditPostModal = props => {
  const classes = useStyles();
  const { modalData } = props;
  const [values, setValues] = useState({
    title: props.modalData.title,
    body: props.modalData.body
  });

  useEffect(() => {
    setValues({ title: modalData.title, body: modalData.body });
  }, [modalData.title, modalData.body]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    props.closeEditModal();
  };

  const editPost = () => {
    let data = {
      id: props.modalData.id,
      title: values.title,
      body: values.body
    };
    props.editPostRequest(data);
    setValues({ title: "", body: "" });
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="Edit Post"
      aria-describedby="Edits a post"
      className={classes.modal}
      open={props.modalOpened}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <Fade in={props.modalOpened}>
        <form className={classes.paper} noValidate autoComplete="off">
          <TextField
            id="outlined-title"
            label="Title"
            onChange={handleChange("title")}
            value={values.title}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-dense-description"
            label="Description"
            onChange={handleChange("body")}
            value={values.body}
            margin="dense"
            variant="outlined"
            multiline
            rowsMax="4"
          />
          <Button
            variant="contained"
            onClick={() => {
              editPost();
            }}
          >
            Edit
          </Button>
        </form>
      </Fade>
    </Modal>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(PostReducer, dispatch);

const mapStateToProps = state => ({
  posts: state.posts,
  modalOpened: state.posts.modalOpened,
  modalData: state.posts.modalData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostModal);
