import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: { 
    backgroundColor: "#FAFAFB",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    marginTop: "50px",
  },
  menuItem: {
    fontSize: "1.1rem",
    margin: "10px 40px",
    color: '#8D8D8D',
    hover: "none",
    fontWeight: 800,
  },
  selectedMenuItem: {
    color: '#000000'
  },
  menuItems: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer"
  },
}));

export default useStyles;
