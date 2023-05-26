import passwordRecovery from './authorization/passwordRecovery';
import signIn from './authorization/signIn';
import menu from './main/menu';
import res from './resolutions';
import place from './placeholders';
import side from './side';
import desc from './one_descriptions'
import {fields} from './fields'

export default {
        ...signIn,
        ...passwordRecovery,
        ...menu,
        ...res,
        ...place,
        ...side,
        ...desc,
        ...fields,
} as Record<string, string>