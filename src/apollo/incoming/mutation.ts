import { gql } from "@apollo/client";

export const create_document = gql`
        mutation{
                createIncomingDocument(input:{
                        language: "RU"
                        sheetsQuantity: 1
                        additionsQuantity: 0
                }){
                        draftLimitExceeded
                        incomingDocument{
                                uuid
                        }
                        errors{
                                field
                                messages
                        }
                }
        }
`

export const denied_update = gql`
        mutation($resolution: UUID!, $person: UUID!){
                createIncomingDocumentResolutionExecutor(input:{
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
                updateIncomingDocumentResolutionDenied(
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
                createIncomingDocumentResolutionDenied(input:{
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
                deleteIncomingDocumentResolution(
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
                updateIncomingDocumentResolution(id:$id_resolution, input:{
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
        ){
                updateIncomingDocumentResolution(id:$id_resolution, input:{
                        final:$final
                }){
                        ok
                }
        }
`

export const person_resolution = gql`
        mutation($id_resolution: UUID!, $person: UUID!){
                createIncomingDocumentResolutionExecutor(input:{
                        person: $person,
                        resolution: $id_resolution,
                }){
                        ok
                }
        }
`

export const new_create_resolution = gql`
        mutation($id:UUID!, $document_id:UUID!){
                createIncomingDocumentResolution(input:{
                        document: $document_id
                        parentResolution:$id
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
                createIncomingDocumentResolutionExecution(input:{
                        executor:$executor
                        filedToCase:$filed_to_case
                }){
                        ok
                }
        }
`

export const updateIncomingDocument = {
    correspondent: gql`
                mutation(
                        $id:UUID!
                        $correspondent:UUID!
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {correspondent:$correspondent}
                        ){
                                ok
                                errors{
                                        field
                                        messages
                                }
                        }
                }
        `,
    document_type: gql`
                mutation(
                        $id:UUID!
                        $document_type:UUID!
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {documentType:$document_type}
                        ){
                                ok
                        }
                }
        `,
    original_number: gql`
                mutation(
                        $id:UUID!
                        $original_number:String
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {originalNumber:$original_number}
                        ){
                                ok
                                errors{
                                        field
                                        messages
                                }
                        }
                }
        `,
    author: gql`
                mutation(
                        $id:UUID!
                        $author:String
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {author:$author}
                        ){
                                ok
                        }
                }
        `,
    question_nature: gql`
                mutation(
                        $id:UUID!
                        $question_nature:UUID!
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {questionNature:$question_nature}
                        ){
                                ok
                        }
                }
        `,
    control_type: gql`
                mutation(
                        $id:UUID!
                        $control_type:UUID!
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {controlType:$control_type}
                        ){
                                ok
                        }
                }
        `,
    execution_date: gql`
                mutation(
                        $id:UUID!
                        $execution_date:DateTime
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {executionDate:$execution_date}
                        ){
                                ok
                        }
                }
        `,
    language: gql`
                mutation(
                        $id:UUID!
                        $language:String
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {language:$language}
                        ){
                                ok
                        }
                }
        `,
    sheets_quantity: gql`
                mutation(
                        $id:UUID!
                        $sheets_quantity:Int
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {sheetsQuantity:$sheets_quantity}
                        ){
                                ok
                        }
                }
        `,
    additions_quantity: gql`
                mutation(
                        $id:UUID!
                        $additions_quantity:Int
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {additionsQuantity:$additions_quantity}
                        ){
                                ok
                        }
                }
        `,
    summary: gql`
                mutation(
                        $id:UUID!
                        $summary:String
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {summary:$summary}
                        ){
                                ok
                        }
                }
        `,
    replying_to: gql`
                mutation(
                        $id:UUID!
                        $replying_to:UUID
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {replyingTo:$replying_to}
                        ){
                                ok
                        }
                }
        `,
    date: gql`
                mutation(
                        $id:UUID!
                        $date:Date
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {date:$date}
                        ){
                                ok
                                errors{
                                        field
                                        messages
                                }
                        }
                }
        `,
    frequency_of_control: gql`
                mutation(
                        $id:UUID!
                        $frequency_of_control:String
                ){
                        updateIncomingDocument(
                                id:$id,
                                input: {frequencyOfControl:$frequency_of_control}
                        ){
                                ok
                        }
                }
        `
}

export const delete_incoming_executors = gql`
        mutation(
                $id:UUID!
        ){
                deleteIncomingDocumentInternalExecutors(documentUuid:$id)
                {
                        ok
                }       
        }
`

export const update_incoming_executor = gql`
        mutation(
                $id:UUID
                $person:UUID
        ){
                createIncomingDocumentInternalExecutor(input:{
                document:$id
                person:$person
        }){
                ok
                }
        }
`

export const delete_incoming_familiarizations = gql`
        mutation(
                $id:UUID!
        ){
                deleteIncomingDocumentFamiliarizationAll(documentUuid:$id)
                {
                        ok
                }       
        }
`

export const update_incoming_familiarization = gql`
        mutation(
                $id:UUID
                $person:UUID
        ){
        createIncomingDocumentFamiliarization(input:{
                document:$id
                person:$person
        }){
                ok
                }
        }
`

export const delete_incoming_document = gql`
        mutation($id:UUID!){
                deleteIncomingDocument(id:$id){
                        ok
                }
        }
`

export const send_to_registration = gql`
        mutation(
                $id:UUID
                $key: String
                $password: String
        ){
                incomingDocumentRegister(
                        input:{
                                document:$id
                                ecpKey: $key
                                ecpPassword: $password
                        }
                )
                {
                        ok
                        error
                }
        }
`

export const send_to_rejected = gql`
        mutation(
                $id:UUID
                $key: String
                $password: String
                $rejectionReason: String
        ){
                incomingDocumentRegister(
                        input:{
                                document:$id
                                ecpKey: $key
                                ecpPassword: $password
                                rejectionReason: $rejectionReason
                        }
                )
                {
                        ok
                        error
                }
        }
`

export const on_reg = gql`
        mutation(
                $id:UUID
        ){
                incomingDocumentRegister(
                        input:{
                                document:$id
                        }
                )
                {
                        ok
                }
        }
`

export const create_resolution = gql`
        mutation(
                $id: UUID
                $subject: String
                $executedDate: DateTime
                $text: UUID
                $responsible: UUID
        ){
                createIncomingDocumentResolution(
                        input:{
                                document: $id
                                subject:$subject
                                executedDate:$executedDate
                                text: $text
                                responsible: $responsible
                        }
                ){
                        resolution{
                                uuid
                        }
                }
        }
`

export const update_resolution_ = gql`
        mutation(
                $id: UUID!
                $subject: String
                $executedDate: DateTime
                $text: UUID
                $responsible: UUID
        ){
                updateIncomingDocumentResolution(
                        id: $id
                        input:{ 
                                subject:$subject
                                executedDate:$executedDate
                                text: $text
                                responsible: $responsible
                                status: "IN_PROCESS"
                        }
                ){
                        ok
                }
        }
`

export const update_resolution_in_process = gql`
                mutation(
                $id: UUID!
        ){
                updateIncomingDocumentResolution(
                        id: $id
                        input:{ 
                                status: "IN_PROCESS"
                        }
                ){
                        ok
                }
        }
`

export const update_resolution_final_ = gql`
        mutation(
                $id: UUID!
        ){
                updateIncomingDocumentResolution(
                id: $id
                        input:{
                                status: "IN_PROCESS"
                                final: true
                        }
                ){
                        ok
                }
        }
`

export const update_status = gql`
        mutation ($id: UUID!, $status: String) {
                updateIncomingDocument(
                        id: $id
                        input: {
                                status: $status
                        }
                ){
                        ok
                }
        }
`
