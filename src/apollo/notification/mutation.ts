import { gql } from '@apollo/client'

export const notification_read_true = gql`
        mutation($id: UUID!){
                updateNotification(
                        id:$id
                        input:{
                                read: true
                        }
                ){
                        ok
                }
        }
`

export const read_all_notifications = gql`
        mutation{
                readAllNotifications{
                        ok
                }
        }
`
