import { gql } from '@apollo/client'

export const notification_for_user = gql`
        query(
                $target: UUID
                $offset: Int
        ){
                notifications(
                        read: false
                        target_Uuid: $target
                        limit: 4
                        offset: $offset
                ){
                        totalCount
                        results{
                                uuid
                                verb
                                redirectShortUrl
                                timestamp
                        }
                }
        }
`
