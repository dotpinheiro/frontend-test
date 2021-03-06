import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "3px",
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column"
  }
}));

export default styles;
