import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'

const Notification = ({ message,type }) => {
  if (message === null) {
    return null
  }
  console.log(type);
  
  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterByName, setFilterByName] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(()=>{   
    personService
      .getAll()
      .then(initialPerson => setPersons(initialPerson))
  },[])
  
  const handleFilterInput = (event) => {
    setFilterByName(event.target.value);
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const notificationSetter = (message,type)=>{
    console.log('first one: ',type);
    
    setNotification(message)
    setNotificationType(type)
    setTimeout(()=>{
      setNotification(null)
      setNotificationType(null)
    },5000)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };

    // Check if the name already exists in the phonebook but with a different number.
    // This means the user might want to update the number.
    if (persons.some((person) => person.name === newObject.name && person.number != newObject.number)) {
      const personId = persons.find(p => p.name === newName).id
      if(window.confirm(`${newName} is already added to phonebook, do you want to replace the old number with the new one?`)){
        personService.update(personId,newObject).then(returnedPerson => {
          setPersons(persons.map(p=> p.id === personId ? returnedPerson:p))        
        })
        setNewName("")
        setNewNumber("")
        notificationSetter(`${newName}'s Number has been updated.`,'success')
      }
      
      return;
    }
    // Check if the name and number already exist in the phonebook.
    // If both match, no update is needed, so show an alert.
    else if(persons.some((person) => person.name === newObject.name && person.number == newObject.number)) {
      notificationSetter(`${newName} is already added to phonebook.`,'error')
      return;
    }
    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        notificationSetter(`${returnedPerson.name} has been added to phonebook`,'success')
      })   
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterByName.toLowerCase())
  );

  const handleDeletePerson = (id) => {
    const personToBeDeleted =persons.find(person=> person.id === id).name
    if(window.confirm(`Delete ${personToBeDeleted}?`)){
      personService
      .deletePerson(id)
      .then(returnedId => {
        setPersons(persons.filter(person => person.id !== returnedId))
        notificationSetter(`${personToBeDeleted} has been deleted from phonebook.`,'success')        
      }
      ).catch( () =>{
        notificationSetter(`${personToBeDeleted} is already deleted from the server.`,'error')
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div className="main">
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType}/>
      <Filter
        filterByName={filterByName}
        handleFilterInput={handleFilterInput}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
