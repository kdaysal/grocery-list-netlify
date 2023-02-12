// This form will be called from App.js and will only be visible if editUser is set to true (I haven't made an "editUser" state yet, but will go back and add it to the top of App.js and default it to false)

//Next steps - do the above, then basically copy the same functionality / workflow that I used for my editItem form to make an editUser form.


import { useState } from "react";
import Button from "../Button/Button";

const EditUser = ({
  user,
  onEdit,
  onSave, //to flip state of showEditUser from true to false
  onDelete,
  showEditUser
}) => {
  const [oldUserName, setOldUserName] = useState(user.name); //state of the original user's name prior to the upcoming change/modification

  const [newUserName, setNewUserName] = useState(''); //state of the original user's name prior to the upcoming change/modification


  //console.log(`oldUserName passed to EditItem component: ${oldUserName}`);

  const onSubmit = (e) => {
    e.preventDefault();//prevent the form from submitting to a new page
    if (oldUserName.toLowerCase() != newUserName.toLowerCase()) {


      // get newUserName from the 'e' here that was submitted in the form
      //console.log(`now passing updated name: ${newUserName} to editUser function in App.js`)
      onEdit(newUserName);

      //console.log(`EditUser form was submitted`)

      setOldUserName('');
      onSave();//set showEditUser = !showEditUser (in App.js) to hide the EditUser form
    }

    else {
      alert('Name is unchanged - please modify or cancel this form');
    }
  }

  console.log(`from EditUser component, 'user' is: ${JSON.stringify(user)}`);

  return (
    <>
      <form className='edit-user-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Edit User Name</label>
          <input type='text'
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder={oldUserName}
          />
        </div>
        <input className='btn btn-block' type='submit' value='Save form' />
        <Button
          btnText={'Cancel'}
          btnColor={'orange'}
          onClick={() => {
            onSave();
            onEdit(user.name);
          }}
        >
        </Button>
      </form>
      <Button
        btnText={'Delete User'}
        btnColor={'red'}
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this user? This action is irreversible!')) {
            onDelete(user._id)
            onSave();//This just flips showEditUser to its opposite
          }
        }}
      >
      </Button>
    </>
  )
}

export default EditUser