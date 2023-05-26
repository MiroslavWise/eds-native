import { gql } from "@apollo/client";

export const update_draft_internal = {
    documentType: gql`
                mutation($id: UUID!, $document_type: UUID!){
                        updateInternalDocument(id:$id, input:{documentType: $document_type}){
                                ok
                        }
                }
        `,
    questionNature: gql`
                mutation($id: UUID!, $nature_question: UUID!){
                        updateInternalDocument(id:$id, input:{questionNature: $nature_question}){
                                ok
                        }
                }
        `,
    caseIndex: gql`
                mutation($id: UUID!, $case_index: UUID!){
                        updateInternalDocument(id:$id, input:{caseIndex: $case_index}){
                                ok
                        }
                }
        `,
    language: gql`
                mutation($id: UUID!, $language: String!){
                        updateInternalDocument(id:$id, input:{language: $language}){
                                ok
                        }
                }
        `,
    signer: gql`
                mutation($id: UUID!, $signer: UUID!){
                        updateInternalDocument(id:$id, input:{signer: $signer}){
                                ok
                        }
                }
        `,
    typeOfAgreement: gql`
                mutation($id: UUID!, $type_of_agreement: String!){
                        updateInternalDocument(id:$id, input:{typeOfAgreement: $type_of_agreement}){
                                ok
                        }
                }
        `,
    summary: gql`
                mutation($id: UUID!, $summary: String!){
                        updateInternalDocument(id:$id, input:{summary: $summary}){
                                ok
                        }
                }
        `,
    note: gql`
                mutation($id: UUID!, $note: String!){
                        updateInternalDocument(id:$id, input:{note: $note}){
                                ok
                        }
                }
        `,
    periodOfExecution: gql`
                mutation($id: UUID!, $period_of_execution: DateTime){
                        updateInternalDocument(id:$id, input:{periodOfExecution: $period_of_execution}){
                                ok
                                internalDocument{
                                        periodOfExecution
                                }
                        }
                }
        `,
    author: gql`
                mutation($id: UUID!, $author: UUID){
                        updateInternalDocument(id:$id, input:{author: $author}){
                                ok
                        }
                }
        `,
    update_empty: gql`
                mutation($id: UUID!){
                        updateInternalDocument(
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

export const create_document = gql`
        mutation{
                createInternalDocument(input:{language:"RU"}){
                        draftLimitExceeded
                        internalDocument{
                                uuid
                        }
                }
        }
`

export const ok_approved = gql`
        mutation(
                $id: UUID!, 
                $status: String!
        ){
                updateInternalDocument(id: $id,
                input:{
                        status: $status
                }){
                        ok
                }
        }
`
export const delete_approvers = gql`
        mutation($id: UUID!){
                deleteInternalDocumentApprovers(documentUuid:$id){
                        ok
                }
        }
`

export const create_receiver = gql`
        mutation (
                $id: UUID!
                $person: UUID!
        ){
                createInternalDocumentReceiver(input:{
                        document: $id,
                        person: $person
                }){
                        ok
                }
        }
`

export const delete_receivers = gql`
        mutation($id: UUID!){
                deleteInternalDocumentReceivers(documentUuid:$id){
                        ok
                }
        }
`

export const create_approver = gql`
        mutation (
                $id: UUID!
                $person: UUID!
                $sequence: Int!
        ){
                createInternalDocumentApprover(input:{
                        document: $id,
                        person: $person,
                        sequence: $sequence
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
                deleteInternalDocumentApprover(
                        documentUuid:  $id
                        personUuid: $personUuid
                ){
                        ok
                }
        }
`

export const delete_document = gql`
        mutation($id:UUID!){
                deleteInternalDocument(id:$id){
                        ok
                }
        }
`

export const refused_approver = gql`
        mutation(
                $id: UUID!
                $comment: String!
        ){
                internalDocumentApprove(
                        id: $id 
                        input:{
                                isRefused: true
                                comment: $comment
                }) {
                        internalDocumentApprove{
                                isApproved
                                isRefused
                                comment
                        }
                }
        }
`

export const approved = gql`
        mutation(
                $id: UUID!
        ){
                internalDocumentApprove(
                        id: $id 
                        input:{
                                isApproved: true
                        }
                ){
                        ok
                }
        }
`
export const refused_signer = gql`
        mutation(
                $id: UUID!, 
                $comment: String!
        ){
                internalDocumentSign(
                        id: $id 
                        input:{
                                isRefused: true,
                                comment: $comment
                }){
                        ok
                }
        }
`
export const __signed__ = gql`
        mutation($id: UUID!){
                internalDocumentSign(
                        id: $id
                        input:{
                                isSigned: true
                }){
                        ok
                }
        }
`

export const __create_resolution__ = gql`
        mutation(
                $id:UUID!
                $text: UUID!
                $subject:String

        ){
                createInternalDocumentResolution(input:{
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

export const __update_resolution__ = gql`
        mutation(
                $id_resolution: UUID! 
                $text: UUID!
                $subject:String
                $executed_date:DateTime
        ){
                updateInternalDocumentResolution(
                        id:$id_resolution
                        input:{
                                text:$text,
                                executedDate:$executed_date,
                                subject:$subject
                        }
                ){
                        ok
                }
        }
`

export const __update_person_resolution__ = gql`
        mutation($id_resolution: UUID!, $person: UUID!){
                createInternalDocumentResolutionExecutor(input:{
                        person: $person,
                        resolution: $id_resolution,
                }){
                        ok
                }
        }
`

export const __update_resolution_final__ = gql`
        mutation(
                $id_resolution: UUID! 
                $final:Boolean
                $executedDate:DateTime
        ){
                updateInternalDocumentResolution(
                        id:$id_resolution
                        input:{
                                executedDate: $executedDate
                                final:$final
                        }
                ){
                        ok
                }
        }
`
















































export const denied_update = gql`
        mutation($resolution: UUID!, $person: UUID!){
                createInternalDocumentResolutionExecutor(input:{
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
                updateInternalDocumentResolutionDenied(
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
                createInternalDocumentResolutionDenied(input:{
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
                deleteInternalDocumentResolution(
                        id:$id
                ){
                        ok
                }
        }
`

export const update_resolution = gql`
        mutation(
                $id_resolution: UUID!, 
                $text: UUID!, 
                $subject:String, 
                $executed_date:DateTime, 
        ){
                updateInternalDocumentResolution(id:$id_resolution, input:{
                        text:$text,
                        executedDate:$executed_date,
                        subject:$subject,
                }){
                        ok
                }
        }
`

export const update_resolution_final = gql`
        mutation(
                $id_resolution: UUID!,
                $final:Boolean
                $executedDate: DateTime
        ){
                updateInternalDocumentResolution(id:$id_resolution, input:{
                        final:$final
                        executedDate: $executedDate
                }){
                        ok
                }
        }
`

export const person_resolution = gql`
        mutation($id_resolution: UUID!, $person: UUID!){
                createInternalDocumentResolutionExecutor(input:{
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
                createInternalDocumentResolution(input:{
                        document: $document_id
                        parentResolution:$id
                        subject: $subject
                        text:$text
                        }){
                        resolution{
                                parentResolution{
                                        uuid
                                }
                                uuid
                                executedDate
                        }
                }
        }
`

export const complete_resolution = gql`
        mutation(
                $executor:UUID!
                $filed_to_case:UUID!
        ){
                createInternalDocumentResolutionExecution(input:{
                        executor:$executor
                        filedToCase:$filed_to_case
                }){
                        ok
                }
        }
`
