import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  linkTo: string;
  btnText: string;
}

const SignUpHeader = ({ linkTo, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.authHeader}>
      <Link to={linkTo} className={classes.link}>
        <Button className={classes.accBtn} variant="contained">
          {btnText}
        </Button>
      </Link>
    </Box>
  );
};

export default SignUpHeader;
