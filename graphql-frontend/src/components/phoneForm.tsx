import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "../utils/queries"
import { useState } from "react"

const PhoneForm = () => {
    const [editPhone] = useMutation(EDIT_NUMBER);
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        editPhone({ variables: { name, phone } });
        setName('');
        setPhone('');
    };

    return (
        <form onSubmit={submit}>
            <h2>Edit Phone</h2>
            <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
            </div>
            <div>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="phone" />
            </div>
        <button type="submit">edit</button>
        </form>
    );
}

export default PhoneForm;