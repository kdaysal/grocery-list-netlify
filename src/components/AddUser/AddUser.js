// This form will be called from App.js and will only be visible if addUser is set to true 

//Next steps - do the above, then basically copy the same functionality / workflow that I used for my editUser form to make an addUser form.


import { useState } from "react";
import Button from "../Button/Button";

const AddUser = ({
  user,
  onSave, //to flip state of showAddUser from true to false
  showAddUser,
  onAddUser,
  onAddShow
  //need to import array of all the current userNames here
}) => {

  const [newUserName, setNewUserName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();//prevent the form from submitting to a new page

    //validation to check that the new userName to be created does not already exist - TBD...



    // get newUserName from the 'e' here that was submitted in the form
    console.log(`now passing updated name: ${newUserName} to addUser function in App.js`)
    onAddUser(newUserName);

    console.log(`AddUser form was submitted`)

    onSave();//set showAddUser = !showAddUser (in App.js) to hide the EditUser form
  }


  return (
    <form className='add-user-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Add User Name</label>
        <input type='text'
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder={"New User's Name"}
        />
      </div>
      <input className='btn btn-block' type='submit' value='Save form' />
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