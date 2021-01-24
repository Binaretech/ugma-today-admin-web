import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {trans} from '../../trans/trans';
import drawerContent from './drawerContent';
import {ListItemLink} from '../listItemLink/ListItemLink';
import {useLogout, useWindowSize} from '../../utils/customHooks';
import Link from '@material-ui/core/Link';
import styles from './Scaffold.module.css';
import Footer from '../footer';

const drawerWidth = 240;
const drawerSizeChange = 630;

const useStyles = (windowWidth) =>
  makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      display: 'flex',
      flexDirection: 'row',
    },
    linksContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: '10px',
      minWidth: 190,
      width: '100%',
      justifyContent: 'flex-end',
      '& button': {
        color: 'white',
        fontSize: '15px',
      },
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(windowWidth > drawerSizeChange ? {marginLeft: -drawerWidth} : {}),
      marginTop: '55px',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));

export default function Scaffold(props) {
  const [width] = useWindowSize();
  const classes = useStyles(width)();
  const theme = useTheme();
  const logout = useLogout();
  const [open, setOpen] = useState(width >= drawerSizeChange ? true : false);
  const [drawerVariant, setDrawerVariant] = useState(
    width > drawerSizeChange ? 'persistent' : 'temporary',
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setDrawerVariant(width > 630 ? 'persistent' : 'temporary');
  }, [width]);

  return (
    <div className={styles.container}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {trans('Components.scaffold.title')}
            </Typography>
          </Toolbar>
          <div className={classes.linksContainer} id={styles.linksContainer}>
            <Link component="button" onClick={() => logout()}>
              {trans('Components.scaffold.logout')}
            </Link>
          </div>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant={drawerVariant}
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {drawerContent().map((content, index) => (
              <React.Fragment key={index}>
                <ListItemLink
                  key={content.title}
                  to={content.to}
                  action={content.action}>
                  <ListItemIcon>
                    <content.icon.type />
                  </ListItemIcon>
                  <ListItemText primary={content.title} />
                </ListItemLink>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>
          {props.children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
