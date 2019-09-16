import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardHeader,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  CardContent,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PostReducer } from "../../store/ducks/posts";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";

const Post = props => {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOptions = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDetails = event => {
    setExpand(!expand);
  };

  const removePost = () => {
    props.removePostRequest(props.post.id);
  };

  const openEditModal = () => {
    props.openEditModal(props.post);
    handleClose();
  };

  return (
    <Card className={classes.post}>
      <CardHeader
        title={props.post.title}
        onClick={handleDetails}
        action={
          <Fragment>
            <IconButton
              aria-label="settings"
              aria-haspopup="true"
              aria-controls="simple-menu"
              onClick={handleOptions}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={openEditModal}>Editar</MenuItem>
              <MenuItem onClick={removePost}>Excluir</MenuItem>
            </Menu>
          </Fragment>
        }
      />
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.body}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(PostReducer, dispatch);

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
