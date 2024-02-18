import { Person as person } from "../types"

interface PersonProps {
    person: person
    onClose: () => void
}
const Person = ({person, onClose}:PersonProps) => {
    return (
        <div>
            <h2>{person.name}</h2>
            <div>
                {person.address.street} {person.address.city}
            </div>
            <div>{person.phone}</div>
            <button onClick={onClose}>close</button>
        </div>
    )
}

export default Person