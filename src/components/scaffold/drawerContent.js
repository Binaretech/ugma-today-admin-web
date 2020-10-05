import { trans } from "../../trans/trans";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import paths from "../../routes/paths";

export default [
    [
        {
            title: trans('Components.drawer.listPrices'),
            icon: MonetizationOnIcon,
            to: paths.costList
        },
    ]
];
