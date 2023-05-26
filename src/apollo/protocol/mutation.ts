import { gql } from "@apollo/client";

export const create_document = gql`
        mutation{
                createProtocol(input:{
                        status:"DRAFT"
                })
                {
                        draftLimitExceeded
                        protocol{
                                uuid
                        }
                }
        }
`

export const denied_update = gql`
        mutation($resolution: UUID!, $person: UUID!){
                createProtocolResolutionExecutor(input:{
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
                updateProtocolResolutionDenied(
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
                createProtocolResolutionDenied(input:{
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
                deleteProtocolResolution(
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
                updateProtocolResolution(id:$id_resolution, input:{
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
                $id_resolution: UUID!
                $final:Boolean
                $executedDate: DateTime
        ){
                updateProtocolResolution(
                        id:$id_resolution, 
                        input:{
                                executedDate: $executedDate
                                final:$final
                        }
                ){
                        ok
                }
        }
`

export const person_resolution = gql`
        mutation($id_resolution: UUID!, $person: UUID!){
                createProtocolResolutionExecutor(input:{
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
                createProtocolResolution(input:{
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
                        }
                }
        }
`

export const complete_resolution = gql`
        mutation(
                $executor:UUID!
                $filed_to_case:UUID!
        ){
                createProtocolResolutionExecution(input:{
                        executor:$executor
                        filedToCase:$filed_to_case
                }){
                        ok
                }
        }
`


export const delete_document = gql`
        mutation($id:UUID!){
                deleteProtocol(id:$id)
                {
                        ok
                }
        }
`

export const send_approve = gql`
        mutation(
                $id: UUID!, 
        ){
                updateProtocol(id: $id, input:{
                        status: "PENDING_APPROVE"
                }){
                        ok
                }
        }
`

export const refused_approve = gql`
        mutation($id: UUID!
                $is_refused: Boolean!
                $comment: String!
        ){
                updateProtocolApprove(id: $id, input:{
                        isRefused: $is_refused,
                        comment: $comment,
                }) {
                        protocolApprove{
                                comment
                        }
                }
        }
`

export const approved_approve = gql`
        mutation(
                $id: UUID!
                $is_approved: Boolean!
        ){
                updateProtocolApprove(id: $id, input:{
                        isApproved: $is_approved,
                }) {
                        protocolApprove{
                                isApproved
                        }
                }
        }
`

export const refused_signed = gql`
        mutation($id:UUID!, $comment:String){
                updateProtocolSign(id:$id, input:{
                        isRefused:true
                        comment:$comment
                }){
                        ok
                }
        }
`

export const signed_document = gql`
        mutation($id:UUID!){
                updateProtocolSign(id:$id, input:{
                        isSigned:true
                }){
                        ok
                }
        }
`

export const updateProtocol = {
    period_of_execution: gql`
                mutation(
                        $id:UUID!
                        $period_of_execution:DateTime
                )
                        {
                                updateProtocol(
                                        id:$id, 
                                        input:{periodOfExecution:$period_of_execution}
                                )
                        {
                                ok
                        }
                }
        `,
    type_of_protocol: gql`
                mutation(
                        $id:UUID!
                        $type_of_protocol:UUID!
                        )
                        {
                                updateProtocol(
                                        id:$id, 
                                        input:{typeOfProtocol:$type_of_protocol}
                                )
                                {
                                        ok
                                }
                        }
        `,
    location: gql`
                mutation(
                        $id:UUID!
                        $location:String
                        )
                        {
                                updateProtocol(
                                        id:$id, 
                                        input:{location:$location}
                                )
                                {
                                        ok
                                }
                        }
        `,
    date: gql`
                mutation(
                        $id:UUID!
                        $date:DateTime
                        )
                        {
                                updateProtocol(
                                        id:$id, 
                                        input:{date:$date}
                                )
                                {
                                        ok
                                }
                        }
        `,
    chairman: gql`
                mutation(
                        $id:UUID!
                        $chairman:UUID
                        )
                        {
                                updateProtocol(
                                        id:$id, 
                                        input:{chairman:$chairman}
                                )
                                {
                                        ok
                                }
                        }
        `,
    type_of_agreement: gql`
                mutation(
                        $id:UUID!
                        $type_of_agreement:String
                        )
                        {
                                updateProtocol(
                                        id:$id, 
                                        input:{typeOfAgreement:$type_of_agreement}
                                )
                                {
                                        ok
                                }
                        }
        `,
    invited: gql`
                mutation(
                        $id:UUID!
                        $invited:String
                        )
                        {
                                updateProtocol(
                                        id:$id, 
                                        input:{invited:$invited}
                                )
                                {
                                        ok
                                }
                        }
        `,
    responsible: gql`
                mutation(
                        $id:UUID!
                        $responsible:UUID
                        )
                        {
                                updateProtocol(
                                        id:$id, 
                                        input:{responsibleForExecute:$responsible}
                                )
                                {
                                        ok
                                }
                        }
        `,
    valid_from: gql`
                mutation(
                        $id:UUID!
                        $validFrom:Date
                ){
                        updateProtocol(
                                id:$id, 
                                input:{validFrom:$validFrom}
                        )
                        {
                                ok
                        }
                }
        `,
    update_status_pdf: gql`
                mutation($id: UUID!){
                        updateProtocol(
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

export const delete_attends = gql`
        mutation($id:UUID!){
                deleteProtocolAttendedList(documentUuid:$id){
                        ok
                }
        }
`

export const update_attended = gql`
        mutation($id:UUID, $person:UUID){
                createProtocolAttended(input:{
                        document:$id
                        person:$person
                }){
                        ok
                }
        }
`

export const delete_approvers = gql`
        mutation($id:UUID!){
                deleteProtocolApprovers(documentUuid:$id){
                        ok
                }
        }
`

export const create_approver = gql`
        mutation($id:UUID ,$person:UUID, $sequence:Int){
                createProtocolApprover(input:{
                        document:$id
                        person:$person
                        sequence:$sequence
                }){
                        ok
                }
        }
`

export const create_subject = gql`
        mutation(
                $id: UUID
        ){
                createProtocolSubject(
                        input:{
                                protocol:$id
                        }
                ){
                        subject{
                                uuid
                        }
                }
        }
`

export const delete_subject = gql`
        mutation(
                $id: UUID
        ){
                deleteProtocolSubject(
                        id:$id
                ){
                        ok
                }
        }
`

export const update_subject = gql`
        mutation(
                        $id: UUID!
                        $speaker: UUID
                        $text: String
                        $id_sub:UUID!
                        $name: String
                ){
                        updateProtocolSubject(
                                id:$id_sub
                                input:{
                                        protocol:$id
                                        speaker:$speaker
                                        text:$text
                                        name: $name
                                }
                ){
                                ok
                }
        }
`

export const create_agenda = gql`
        mutation($id: UUID, $text: String){
                createProtocolAgenda(
                        input:{
                                document: $id
                                text:$text
                }){
                        agenda{
                                uuid
                        }
                }
        }
`

export const update_agenda = gql`
        mutation(
                $id_agenda: UUID!
                $text: String
        ){
                updateProtocolAgenda(
                        id:$id_agenda
                        input:{
                                text: $text
                        }
                )
                {
                ok
                }
        }
`

export const delete_agenda = gql`
        mutation($id_agenda: UUID){
                deleteProtocolAgenda(id: $id_agenda){
                        ok
                }
        }
`

export const create_resolution = gql`
        mutation($id:UUID!){
                createProtocolResolution(
                        input:{document:$id}
                ){
                        resolution{
                                uuid
                        }
                }
        }
`

export const update_protocol_resolution = gql`
        mutation(
                        $id_res:UUID!
                        $subject:String
                        $executed_date:DateTime
                        $protocolSubject: UUID
                        $agenda: UUID
                ){
                        updateProtocolResolution(id:$id_res, input:{
                                subject:$subject,
                                executedDate:$executed_date,
                                protocolSubject: $protocolSubject
                                agenda: $agenda
                        }){
                                ok
                        }
                }
`

export const delete_resolution_executors = gql`
        mutation(
                $id_res:UUID!
        ){
                deleteProtocolResolutionExecutors(
                        id:$id_res
                ){
                        ok
                }
        }
`

export const create_resolution_executor = gql`
        mutation(
                $id_res:UUID!
                $person:UUID!
        ){
                createProtocolResolutionExecutor(
                        input:{
                                resolution:$id_res
                                person:$person
                        }
                ){
                        ok
                }
        }
`
