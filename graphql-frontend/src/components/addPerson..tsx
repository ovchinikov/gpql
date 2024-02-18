import { useMutation } from "@apollo/client";
import { useState } from "react"
import { CREATE_PERSON, GET_PERSONS } from "../utils/queries"





const AddPerson = () => {
    const [addPerson] = useMutation(CREATE_PERSON,{
        refetchQueries: [{query: GET_PERSONS}]
    });
    const [name, setName] = useState<string>('') ;
    const [city, setCity] = useState<string>('') ;
    const [street, setStreet] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addPerson({ variables: { name, city, street, phone } }).then((res => {
            console.log(res)
            setName('');
            setCity('');
            setStreet('');
            setPhone('');
        })).catch(err => console.log(err));

    }




    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <h2>Add a new person</h2>
                <div>
                <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />
                </div>
               <div>
                <input type="text" value={city} placeholder="city" onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                <input type="text" value={street} placeholder="street" onChange={(e) => setStreet(e.target.value)} />
                </div>
                <div>
                <input type="text" value={phone} placeholder="phone" onChange={(e) => setPhone(e.target.value)} />
               </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}


export default AddPerson;