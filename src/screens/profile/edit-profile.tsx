
import { SafeAreaView } from 'react-native'



import EditMain from 'components/edit-profile/Main'

const EditProfile = ({ navigation }: { navigation: any }) => {
        
        return (
                <SafeAreaView>
                        <EditMain navigation={navigation} />
                </SafeAreaView>
        )
}

export default EditProfile 