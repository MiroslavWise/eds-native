import { shallow } from 'zustand/shallow'
import { Text } from 'react-native'

import useDocuments from 'store/use-docs'

interface IProps{
        type: 'incomings' | 'outgoings' | 'internals' | 'protocols' | 'orders'
}

const Filters = ({type}: IProps) => {

        const { incomingsFilter, outgoingsFilter, internalsFilter, protocolsFilter, ordersFilter } = useDocuments(
                state => ({
                        incomingsFilter: state.type_filter.incoming,
                        outgoingsFilter: state.type_filter.outgoing,
                        internalsFilter: state.type_filter.internal,
                        protocolsFilter: state.type_filter.protocol,
                        ordersFilter: state.type_filter.order,
                }),
                shallow
        )

        return (
                <Text>
                </Text>
        )
}

export default Filters