import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ITabsNavigation } from "types/types";

import IndexHandbooks from "screens/handbooks";
import CaseIn from "screens/handbooks/casein";
import Control from "screens/handbooks/control";
import Correspondent from "screens/handbooks/correspondent";
import DocType from 'screens/handbooks/doc-type'
import Nomenclature from "screens/handbooks/nomenclature";
import Position from 'screens/handbooks/position'
import Question from "screens/handbooks/question";

const Stack = createNativeStackNavigator();

const STACK_HANDBOOK: ITabsNavigation[] = [
        {
                name: "handbooks_all",
                component: IndexHandbooks,
        },
        {
                name: "casein",
                component: CaseIn,
        },
        {
                name: "control",
                component: Control,
        },
        {
                name: "correspondent",
                component: Correspondent,
        },
        {
                name: "doc-type",
                component: DocType,
        },
        {
                name: "nomenclature",
                component: Nomenclature,
        },
        {
                name: "position",
                component: Position,
        },
        {
                name: "question",
                component: Question,
        },
]

export default function HandBookStack() {
        return (
                <Stack.Navigator>
                        {
                                STACK_HANDBOOK.map(item => (
                                        <Stack.Screen
                                                key={`${item.name}_handbook`}
                                                options={{
                                                        headerShown: false,
                                                }}
                                                navigationKey={item.name}
                                                name={item.name}
                                                component={item.component}
                                        />
                                ))
                        }
                </Stack.Navigator>
        )
}