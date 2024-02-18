import { useQuery,gql } from "@apollo/client"
import { Person as person } from "../types"
import Person from "./person"
import { useState } from "react"


interface PersonsProps {
    persons: person[]
}

const FIND_PERSON = gql `
query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    name,
    phone,
    id,
    address {
      street,
      city
    }
  }
}
`
const Persons = ({persons}: PersonsProps) => {
    const [nameToSearch, setNameToSearch] = useState<string >('')
    const {data, error, loading} = useQuery(FIND_PERSON, {
        variables: {nameToSearch},
        skip: !nameToSearch
    })

    console.log(data)

    if (error) {
        return <div>An error occured...Please try again later</div>
    }

    if (loading) {
        return <div>loading...</div>
    }

    if (nameToSearch && data) {

        return (
            <div>
                <Person person={data.findPerson} onClose={() => setNameToSearch('')} />
            </div>
        )
    }

    return (
        <div>
            {persons.map((person) => (
                <div key={person.id}>
                    <p>{person.name} - {person.phone}</p>
                    <button onClick={() => setNameToSearch(person.name)}>show address</button>
                </div>
            ))}
        </div>
    )
}

export default Persons