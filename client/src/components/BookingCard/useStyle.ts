import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardDate: {
    marginBottom: theme.spacing(1.8),
  },
  cardAvatar: {
    marginRight: theme.spacing(1.2),
  },
  cardName: {
    fontWeight: 'bolder',
  },
  cardStatus: {
    fontWeight: 'bolder',
    opacity: 0.4,
    marginLeft: 'auto',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  sectionTitle: {
    fontWeight: 'bolder',
    fontSize: theme.typography.pxToRem(13),
    marginTop: theme.spacing(1.2),
    marginBottom: theme.spacing(1.2),
  },
}));

export default useStyles;
