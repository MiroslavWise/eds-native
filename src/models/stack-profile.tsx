import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ITabsNavigation } from "types/types";

import IndexProfile from "screens/profile";
import EditProfile from 'screens/profile/edit-profile';

const Stack = createNativeStackNavigator();

const STACK_PROFILE: ITabsNavigation[] = [
        {
                name: "profile_me",
                component: IndexProfile,
        },
        {
                name: "edit-profile",
                component: EditProfile,
        },
]

export default function ProfileStack() {
        return (
                <Stack.Navigator>
                        {
                                STACK_PROFILE.map(item => (
                                        <Stack.Screen
                                                key={`${item.name}_profile`}
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