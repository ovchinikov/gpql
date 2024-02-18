import { useQuery } from "@apollo/client"
import Persons from "./components/persons"
import AddPerson from "./components/addPerson."
import { GET_PERSONS } from "./utils/queries"
import PhoneForm from "./components/phoneForm"




function App() {
  
  const {data, error, loading} = useQuery(GET_PERSONS)

  if (error) {
    return <div>An error occured...Please try again later</div>
  }

  if (loading) {
    return <div>loading...</div>
  }

  console.log(data)
  return (
   <div>
    <h2>My first Apollo app 🚀</h2>
    <AddPerson  />
    <Persons persons={data.allPersons} />
    <PhoneForm />
   </div>
  )
}

export default App
