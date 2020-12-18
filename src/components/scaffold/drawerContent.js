import { trans } from '../../trans/trans';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import paths from '../../routes/paths';
import { useLogout } from '../../utils/customHooks';

export default () => {
	const logoutOption = [
		{
			title: trans('Components.scaffold.logout'),
			to: paths.login,
			icon: ExitToAppIcon,
			action: useLogout(),
		},
	];

	return [
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
		...logoutOption,
	];
};
