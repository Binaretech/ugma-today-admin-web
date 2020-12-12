import {trans} from '../../trans/trans';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HomeIcon from '@material-ui/icons/Home';
import paths from '../../routes/paths';

const drawerContent = [
  [
    {
      title: trans('Components.drawer.home'),
      icon: HomeIcon,
      to: paths.home,
    },
    {
      title: trans('Components.drawer.listPrices'),
      icon: MonetizationOnIcon,
      to: paths.costList,
    },
  ],
];

export default drawerContent;
