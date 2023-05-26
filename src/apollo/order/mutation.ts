import { gql } from "@apollo/client";

export const create_document = gql`
        mutation{
                createProductionOrder(input:{
                        language: "RU"
                        listQuantityLetters: 1
                }){
                        draftLimitExceeded
                        order{
                                uuid
                        }
                }
        }
`

export const denied_update = gql`
        mutation($resolution: UUID!, $person: UUID!){
                createProductionOrderResolutionExecutor(input:{
                        person: $person,
                        resolution: $resolution,
                }){
                        ok
                }
        }
`

export const denied_true = gql`
        mutation(
                $is_processed:Boolean!, 
                $id:UUID!
        ){
                updateProductionOrderResolutionDenied(
                        id:$id,
                        input:{
                                isProcessed:$is_processed
                }){
                        ok
                        denied{
                        uuid
                        }
                }
        }
`

export const denied_resolution_mutation = gql`
        mutation(
                $executor:UUID!,
                $comment:String,
                $id:UUID!
        ){
                createProductionOrderResolutionDenied(input:{
                        executor: $executor
                        comment:$comment
                        resolution:$id
                }){
                        ok
                }
        }
`

export const delete_resolution = gql`
        mutation($id: UUID!){
                deleteProductionOrderResolution(
                        id:$id
                ){
                        ok
                }
        }
`

export const update_resolution = gql`
        mutation(
                $id_resolution: UUID! 
                $text: UUID!
                $subject:String
                $executed_date:DateTime
        ){
                updateProductionOrderResolution(id:$id_resolution, input:{
                        text:$text,
                        executedDate:$executed_date,
                        subject:$subject
                }){
                        ok
                }
        }
`

export const update_resolution_final = gql`
        mutation(
                $id_resolution: UUID!
                $final:Boolean
                $executedDate: DateTime
        ){
                updateProductionOrderResolution(id:$id_resolution, input:{
                        final:$final
                        executedDate: $executedDate
                }){
                        ok
                }
        }
`

export const person_resolution = gql`
        mutation($id_resolution: UUID!, $person: UUID!){
                createProductionOrderResolutionExecutor(input:{
                        person: $person,
                        resolution: $id_resolution,
                }){
                        ok
                }
        }
`

export const new_create_resolution = gql`
        mutation(
                $id:UUID!
                $document_id:UUID!
                $subject: String
                $text: UUID
        ){
                createProductionOrderResolution(input:{
                        document: $document_id
                        parentResolution:$id 
                        subject: $subject
                        text: $text
                }){
                        resolution{
                                parentResolution{
                                        uuid
                                }
                                uuid
                        }
                }
        }
`

export const complete_resolution = gql`
        mutation(
                $executor:UUID!
                $filed_to_case:UUID!
        ){
                createProductionOrderResolutionExecution(input:{
                        executor:$executor
                        filedToCase:$filed_to_case
                }){
                        ok
                }
        }
`

export const delete_order = gql`
        mutation($id:UUID!){
                deleteProductionOrder(id:$id){
                        ok
                }
        }
`

export const update_to_approve = gql`
        mutation(
                $id:UUID!
        ){
                updateProductionOrder(id:$id, input:{
                        status:"PENDING_APPROVE"
                }){
                        ok
                }
        }
`

export const refused_approve = gql`
        mutation($id: UUID!
                $comment: String!
        ){
                productionOrderApprove(id: $id, input:{
                        isRefused: true,
                        comment: $comment,
                }) {
                        ok
                }
        }
`

export const approved_active = gql`
        mutation(
                $id: UUID!
        ){
                productionOrderApprove(id: $id, input:{
                        isApproved: true,
                }) {
                        ok
                }
        }
`

export const refused_signed = gql`
        mutation($id:UUID!, $comment:String){
                productionOrderSign(id:$id, input:{
                        isRefused:true
                        comment:$comment
                }){
                        ok
                }
        }
`

export const signed_active = gql`
        mutation($id:UUID!){
                productionOrderSign(id:$id, input:{
                        isSigned:true
                }){
                        ok
                }
        }
`

export const create_resolution = gql`
        mutation(
                $id:UUID!
                $text: UUID!
                $subject:String
        ){
                createProductionOrderResolution(input:{
                        document: $id
                        text:$text
                        subject:$subject
                }){
                        resolution{
                                uuid
                        }
                }
        }
`

export const updateOrder = {
    order_type:gql`
                mutation(
                        $id:UUID!
                        $order_type:UUID
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{orderType:$order_type}
                        ){
                                ok
                        }
                }
        `,
    case_index:gql`
                mutation(
                        $id:UUID!
                        $case_index:UUID
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{caseIndex:$case_index}
                        ){
                                ok
                        }
                }
        `,
    name_ru:gql`
                mutation(
                        $id:UUID!
                        $name_ru:String
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{nameRu:$name_ru}
                        ){
                                ok
                        }
                }
        `,
    name_kz:gql`
                mutation(
                        $id:UUID!
                        $name_kz:String
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{nameKz:$name_kz}
                        ){
                                ok
                        }
                }
        `,
    language:gql`
                mutation(
                        $id:UUID!
                        $language:String
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{language:$language}
                        ){
                                ok
                        }
                }
        `,
    period_of_execution:gql`
                mutation(
                        $id:UUID!
                        $period_of_execution:DateTime
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{periodOfExecution:$period_of_execution}
                        ){
                                ok
                        }
                }
        `,
    list_quantity_letters:gql`
                mutation(
                        $id:UUID!
                        $list_quantity_letters:Int
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{listQuantityLetters:$list_quantity_letters}
                        ){
                                ok
                        }
                }
        `,
    list_quantity_attachments:gql`
                mutation(
                        $id:UUID!
                        $list_quantity_attachments:Int
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{listQuantityAttachments:$list_quantity_attachments}
                        ){
                                ok
                        }
                }
        `,
    type_of_agreement:gql`
                mutation(
                        $id:UUID!
                        $type_of_agreement:String
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{typeOfAgreement:$type_of_agreement}
                        ){
                                ok
                        }
                }
        `,
    signer:gql`
                mutation(
                        $id:UUID!
                        $signer:UUID
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{signer:$signer}
                        ){
                                ok
                        }
                }
        `,
    responsible: gql`
                mutation(
                        $id:UUID!
                        $responsible:UUID
                ){
                        updateProductionOrder(
                                id:$id, 
                                input:{responsibleForExecute:$responsible}
                        ){
                                ok
                        }
                }
        `,
    update_empty: gql`
                mutation($id: UUID!){
                        updateProductionOrder(
                                id:$id
                                input:{
                                        pdfStatus: "IN_PROCESS"
                                }
                        ){
                                ok
                        }
                }
        `,
}

export const delete_approvers = gql`
        mutation($id:UUID!){
                deleteProductionOrderApprovers(documentUuid:$id){
                        ok
                }
        }
`


export const create_approver = gql`
        mutation($id:UUID!, $person:UUID, $sequence:Int){
                createProductionOrderApprover(input:{
                        document:$id
                        person:$person
                        sequence:$sequence
                }){
                        ok
                }
        }
`

export const delete_approver = gql`
        mutation (
                $id: UUID!
                $personUuid: UUID!
        ){
                deleteProductionOrderApprover(
                        documentUuid:  $id
                        personUuid: $personUuid
                ){
                        ok
                }
        }
`

export const delete_receivers = gql`
        mutation($id:UUID!){
                deleteProductionOrderReceivers(documentUuid:$id){
                        ok
                }
        }
`

export const create_receiver = gql`
        mutation($id:UUID!, $person:UUID){
                createProductionOrderReceiver(input:{
                        document:$id
                        person:$person
                }){
                        ok
                }
        }
`

export const delete_familiarizations= gql`
        mutation($id:UUID!){
                deleteProductionOrderFamiliarizationAll(documentUuid:$id){
                        ok
                }
        }
`

export const create_familiarization = gql`
        mutation($id:UUID!, $person:UUID){
                createProductionOrderFamiliarization(input:{
                        document:$id
                        person:$person
                }){
                        ok
                }
        }
`
