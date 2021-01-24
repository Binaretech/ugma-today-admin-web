import { useTheme } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styles from './styles.module.css';
import UgmaLogo from '../../assets/UGMA.png';
import { trans } from '../../trans/trans';

export default function Footer() {
  const theme = useTheme();
  return (
    <footer
      className={styles.footer}
      style={{
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <p>{trans('Components.Footer.madeWith')} &nbsp;</p>
      <FavoriteIcon className={styles.heart} />
      <p>&nbsp; {trans('Components.Footer.byStudents')}</p>
      <img src={UgmaLogo} alt="ugma logo" className={styles.logo} />
    </footer>
  );
}
