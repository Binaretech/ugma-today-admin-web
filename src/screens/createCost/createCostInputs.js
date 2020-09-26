import TextInput from "../../components/textInput/TextInput";
import { trans } from "../../trans/trans";

export default () => ([
    {
        type: TextInput,
        props: {
            name: 'name',
            label: trans('words.name'),
            rules: ["number"]
        }
    }
]);