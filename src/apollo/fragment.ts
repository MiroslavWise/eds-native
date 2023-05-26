import { gql } from "@apollo/client";

export const PERSON = gql`
  fragment Person on ProfileType{
    uuid
    id
    department{
      uuid
      nameRu
    }
    gender
    getFullNameRu
    abbreviatedNameRu
    position{
      uuid
      nameRu
    }
    user{
      email
    }
    workPhone
    innerPhone
    mobilePhone
    departmentDirector{
      uuid
      director{
        uuid
        getFullNameRu
      }
    }
    photo
}
`

export const SMALL_PERSON = gql`
  fragment SmallPerson on ProfileType{
    uuid
    getFullNameRu
    position{
      uuid
      nameRu
    }
  }
`
