// This form will be called from App.js and will only be visible if addUser is set to true 

//Next steps - do the above, then basically copy the same functionality / workflow that I used for my editUser form to make an addUser form.


import { useState } from "react";
import Button from "../Button/Button";

const AddUser = ({
  user,
  onSave, //to flip state of showAddUser from true to false
  showAddUser,
  onAddUser,
  onAddShow,
  //need to import array of all the current userNames here
  allUserNames //array holding a list of all the current userNames from the db - this will be used for validation before allowing any NEW usernames to be created/added
}) => {

  const [newUserName, setNewUserName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();//prevent the form from submitting to a new page

    //validation to check that the new userName to be created does not already exist - TBD...
    console.log(`newUserName set to: ${newUserName}`);
    console.log(`allUserNames is currently: ${allUserNames}`);

    let isTaken = false;//boolean to represent whether the new userName already exists in the database
    allUserNames.forEach(name => {
      //console.log(`now comparing name: ${name.toLowerCase()} to newUserName: ${newUserName.toLowerCase()}`);
      if (name.toLowerCase() == newUserName.toLowerCase()) {
        isTaken = true;
      }
    });

    if (isTaken) {
      alert('That name is already taken, please try again');
    }

    else {
      console.log(`now passing updated name: ${newUserName} to addUser function in App.js`)
      onAddUser(newUserName);

      console.log(`AddUser form was submitted`)

      onSave();//set showAddUser = !showAddUser (in App.js) to hide the EditUser form
    }
  }

  return (
    <form className='add-user-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Add User Name</label>
        <input autoFocus
          id="new-user-field"
          type='text'
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder={"New User's Name"}
        />
      </div>
      <input className='btn btn-block' type='submit' value='Save User' />
      <Button
        btnText={'Cancel'}
        btnColor={'orange'}
        onClick={() => {
          onSave();
        }
        }
      >
      </Button>
    </form>
  )
}

export default AddUser