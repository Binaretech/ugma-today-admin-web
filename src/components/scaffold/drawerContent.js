import { trans } from "../../trans/trans";
import ReceiptIcon from '@material-ui/icons/Receipt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import paths from "../../routes/paths";

export default [
    [
        {
            title: trans('Components.drawer.listPrices'),
            icon: ReceiptIcon,
            to: paths.costList
        },
        {
            title: trans('Components.drawer.createPrice'),
            icon: MonetizationOnIcon,
            to: paths.createCost
        }
    ]
];
