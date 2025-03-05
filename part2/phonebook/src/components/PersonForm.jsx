const PersonForm = ({addPerson, newName, handleNameInput, newNumber, handleNumberInput}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameInput} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberInput} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
