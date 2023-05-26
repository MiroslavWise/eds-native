import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ITabsNavigation } from "../types/types";

import IndexEDS from "screens/eds";
import Incomings from "screens/documents/incomings";
import Outgoings from "screens/documents/outgoings";
import Internals from "screens/documents/internals";
import Protocols from "screens/documents/protocols";
import Orders from "screens/documents/orders";

import Incoming from 'screens/documents/incoming'
import Outgoing from 'screens/documents/outgoing';
import Internal from 'screens/documents/internal'
import Protocol from 'screens/documents/protocol'

import IncomingsResolution from 'screens/resolutions/incomings';
import InternalsResolution from 'screens/resolutions/internals';
import ProtocolsResolution from 'screens/resolutions/protocols';
import OrdersResolution from 'screens/resolutions/orders';

import IncomingResolution from 'screens/resolutions/incoming';
import InternalResolution from 'screens/resolutions/internal';
import ProtocolResolution from 'screens/resolutions/protocol';
import OrderResolution from 'screens/resolutions/order';

import Order from 'screens/documents/order'

const Stack = createNativeStackNavigator();

const STACK_DOCUMENTS: ITabsNavigation[] = [
        {
                name: 'EDS',
                component: IndexEDS,
        },
        {
                name: 'incomings',
                component: Incomings,
        },
        {
                name: 'outgoings',
                component: Outgoings,
        },
        {
                name: 'internals',
                component: Internals,
        },
        {
                name: 'protocols',
                component: Protocols,
        },
        {
                name: 'orders',
                component: Orders,
        },
        
        {
                name: 'incomings-resolution',
                component: IncomingsResolution,
        },
        {
                name: 'internals-resolution',
                component: InternalsResolution,
        },
        {
                name: 'protocols-resolution',
                component: ProtocolsResolution,
        },
        {
                name: 'orders-resolution',
                component: OrdersResolution,
        },

        {
                name: 'incoming-resolution',
                component: IncomingResolution,
        },
        {
                name: 'internal-resolution',
                component: InternalResolution,
        },
        {
                name: 'protocol-resolution',
                component: ProtocolResolution,
        },
        {
                name: 'order-resolution',
                component: OrderResolution,
        },

        {
                name: 'incoming',
                component: Incoming,
        },
        {
                name: 'outgoing',
                component: Outgoing,
        },
        {
                name: 'internal',
                component: Internal,
        },
        {
                name: 'protocol',
                component: Protocol,
        },
        {
                name: 'order',
                component: Order,
        },
]

export default function DocumentsStack() {
        return (
                <Stack.Navigator>
                        {
                                STACK_DOCUMENTS.map(item => (
                                        <Stack.Screen
                                                key={`${item.name}_documents`}
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