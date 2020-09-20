import { trans } from "../../trans/trans";
import ReceiptIcon from '@material-ui/icons/Receipt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default [
    [
        {
            title: trans('Components.drawer.listPrices'),
            icon: ReceiptIcon,
            to: '/price-list'
        },
        {
            title: trans('Components.drawer.createPrice'),
            icon: MonetizationOnIcon,
            to: '/price-create'
        }
    ]
];
