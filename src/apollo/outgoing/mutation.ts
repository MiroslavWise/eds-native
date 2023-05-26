import { gql } from "@apollo/client";

export const updateOutgoingDocument = {
    document_type: gql`
                mutation($id: UUID!, $document_type: UUID!){
                        updateOutgoingDocument(id: $id, input:{documentType: $document_type}){
                                ok
                        }
                }
        `,
    nature_question: gql`
                mutation($id: UUID!, $nature_question: UUID!){
                        updateOutgoingDocument(id: $id, input:{questionNature: $nature_question}){
                                ok
                        }
                }
        `,
    case_index: gql`
                mutation($id: UUID!, $case_index: UUID!){
                        updateOutgoingDocument(id: $id, input:{caseIndex: $case_index}){
                                ok
                        }
                }
        `,
    language: gql`
                mutation($id: UUID!, $language: String!){
                        updateOutgoingDocument(id: $id, input:{language: $language}){
                                ok
                        }
                }
        `,
    signer: gql`
                mutation($id: UUID!, $signer: UUID!){
                        updateOutgoingDocument(id: $id, input:{signer: $signer}){
                                ok
                        }
                }
        `,
    type_of_agreement: gql`
                mutation($id: UUID!, $type_of_agreement: String!){
                        updateOutgoingDocument(id: $id, input:{typeOfAgreement: $type_of_agreement}){
                                ok
                        }
                }
        `,
    summary: gql`
                mutation($id: UUID!, $summary: String!){
                        updateOutgoingDocument(id: $id, input:{summary: $summary}){
                                ok
                        }
                }
        `,
    sheets_quantity: gql`
                mutation($id: UUID!, $sheets_quantity: Int){
                        updateOutgoingDocument(id: $id, input:{sheetsQuantity: $sheets_quantity}){
                                ok
                        }
                }
        `,
    additions_quantity: gql`
                mutation($id: UUID!, $additions_quantity: Int){
                        updateOutgoingDocument(id: $id, input:{additionsQuantity: $additions_quantity}){
                                ok
                        }
                }
        `,
    replying_to: gql`
                mutation($id: UUID!, $replying_to: String){
                        updateOutgoingDocument(id: $id, input:{replyingTo: $replying_to}){
                                ok
                        }
                }
        `,
    author: gql`
                mutation($id: UUID!, $author: UUID!){
                        updateOutgoingDocument(id: $id, input:{author: $author}){
                                ok
                        }
                }
        `,
    update_pdf: gql`
                mutation($id: UUID!){
                        updateOutgoingDocument(
                                id:$id
                                input:{
                                        pdfStatus: "IN_PROCESS"
                                }
                        ){
                                ok
                        }
                }
        `
}

export const create_document = gql`
        mutation{
                createOutgoingDocument(input:{
                        language: "RU"
                        sheetsQuantity:1
                }){
                        draftLimitExceeded
                        outgoingDocument{
                        uuid
                        }
                }
        }
`

export const delete_document = gql`
        mutation($id:UUID!){
                deleteOutgoingDocument(id:$id){
                        ok
                }
        }
`

export const approved_and_signed = gql`
        mutation(
                $id: UUID!
        ){
                updateOutgoingDocument(
                        id: $id, 
                        input:{
                                status: "PENDING_APPROVE"
                        }
                ){
                        ok
                }
        }
`

export const approved_document = gql`
        mutation($id: UUID!, 
                $is_approved: Boolean!
        ){
                outgoingDocumentApprove(id: $id, input:{
                        isApproved: $is_approved
                }){
                        outgoingDocumentApprove{
                                isApproved
                                isRefused
                                comment
                        }
                }
        }
`

export const refused_document_approver = gql`
        mutation($id: UUID!
                $is_refused: Boolean!
                $comment: String!
        ){
                outgoingDocumentApprove(id: $id, input:{
                        isRefused: $is_refused,
                        comment: $comment,
                }){
                        outgoingDocumentApprove{
                                isApproved
                                isRefused
                                comment
                        }
                }
        }
`

export const refused_document_by_signer = gql`
        mutation($id: UUID!, 
                $is_refused: Boolean!
                $comment: String!
        ){
                outgoingDocumentSign(id: $id, input:{
                        isRefused: $is_refused,
                        comment: $comment
                }) {
                        outgoingDocumentSign{
                                isSigned
                                isRefused
                                comment
                        }
                }
        }
`

export const sign_document = gql`
        mutation($id: UUID!, 
                $is_signed: Boolean!
                $ecpKey: String
                $ecpPassword: String
        ){
                outgoingDocumentSign(id: $id, input:{
                        isSigned: $is_signed
                        ecpKey: $ecpKey
                        ecpPassword: $ecpPassword
                }) {
                        ok
                        error
                }
        }
`

export const registration_document = gql`
        mutation(
                $id:UUID!
                $ecpKey: String
                $ecpPassword: String
        ){
                outgoingDocumentRegister(input:{
                        document: $id,
                        ecpKey: $ecpKey
                        ecpPassword: $ecpPassword
                }){
                        ok
                        error
                }
        }
`

export const delete_all_approvers = gql`
        mutation($id: UUID!){
                deleteOutgoingDocumentApprovers(documentUuid:$id){
                        ok
                }
        }
`

export const delete_current_approver = gql`
        mutation($id:UUID!, $person:UUID!){
                deleteOutgoingDocumentApprover(documentUuid: $id, personUuid:$person){
                        ok
                }
        }
`

export const approvers_add = gql`
        mutation (
                $id: UUID!
                $person: UUID!
                $sequence: Int! 
        ){
                createOutgoingDocumentApprover(input:{
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
                deleteOutgoingDocumentApprover(
                        documentUuid:  $id
                        personUuid: $personUuid
                ){
                        ok
                }
        }
`

export const delete_receivers = gql`
        mutation($id: UUID!){
                deleteOutgoingDocumentReceivers(documentUuid:$id){
                        ok
                }
        }
`

export const receiver_add = gql`
        mutation (
                $id: UUID!
                $correspondent: UUID!
        ){
                createOutgoingDocumentReceiver(input:{
                        document: $id,
                        correspondent: $correspondent
                        })
                {
                        ok
                }
        }
`

export const delete_documents_link = gql`
        mutation($uuid: UUID!){
                incomingDocumentLinkDeleteAll(uuid: $uuid){
                        ok
                        errors{
                                messages
                                field
                        }
                }
        }
`

export const add_document_link = gql`
        mutation(
                $uuid: UUID!
                $targetAppLabel: String!
                $targetModelName: String!
                $targetObjectUuid: UUID!
        ){
                incomingDocumentLinkAdd(
                        uuid: $uuid
                        input:{
                                targetAppLabel: $targetAppLabel
                                targetModelName: $targetModelName
                                targetObjectUuid: $targetObjectUuid
                        }
                ){
                        ok
                        errors{
                                messages
                                field
                        }
                }
        }
`
