//TEST - this is an edit from my mac and committed/pushed to 'mac-wip-1' branch
//import React from 'react'; //only needed for class components; not used here
//https://damp-forest-55138.herokuapp.com/users ... quick visual ref for what the user objects look like
import { useState, useEffect } from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import Header from './components/Header/Header';
import AddItem from './components/AddItem/AddItem';
import GroceryItems from './components/GroceryItems/GroceryItems';
import EditItem from './components/EditItem/EditItem';
import EditUser from './components/EditUser/EditUser';
import AddUser from './components/AddUser/AddUser';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [allUserData, setallUserData] = useState([]); // object to hold the entirety of all data from my API
  const [allUserNames, setAllUserNames] = useState([]); // an array to hold all unique user names
  const [userName, setUserName] = useState(''); // string to hold the current user name that is 'in session'
  const [user, setUser] = useState({}); // array to hold all data for only the current user who is 'in session'
  const [visibilityFilter, setVisibilityFilter] = useState('all');

  // Below states are used for editing a single grocery item for the in-session user
  const [groceryItemId, setGroceryItemId] = useState('');// stores an individual grocery item ID to be used with the editGroceryItem function
  const [groceryItemName, setGroceryItemName] = useState('');// stores an individual grocery item ID to be used with the editGroceryItem function
  const [groceryItemAisle, setGroceryItemAisle] = useState('');// stores an individual grocery item Aisle to be used with the editGroceryItem function
  const [groceryItemReminder, setGroceryItemReminder] = useState('');// stores an individual grocery item Reminder boolean to be used with the editGroceryItem function

  //On initial page load, retrieve all users from my api server and update state of 'allUserData' accordingly
  useEffect(() => {
    const getAllUserData = async () => {
      const allUserData = await fetchUsers();
      setallUserData(allUserData);

      //create a blank array to hold just the usernames retrieved from the db:
      const currentUserNames = [];
      allUserData.map((x) => {
        currentUserNames.push(x.name)
      });
      setAllUserNames(currentUserNames);
      console.log(`current user object: ${JSON.stringify(user)}`);
    }
    getAllUserData();
  }, [user])

  //Fetch full list of all grocery items from the server and return the response as json
  const fetchUsers = async () => {
    setIsLoading(true);
    const res = await fetch('https://damp-forest-55138.herokuapp.com/users');
    const data = await res.json();
    setIsLoading(false);
    return data;
  }

  //takes in a userId and updates the 'user' object in the database to match whatever the current state of 'user' in App.js is. This works because this function will only be called AFTER state of 'user' has been updated in App.js.
  const updateDatabase = async (userId, updatedUser = null) => {
    console.log(`updateDatabase function called in App.js`);
    //console.log(`JSON.stringify(user) in updateDatabase(): ${JSON.stringify(user)}`);
    //console.log(`JSON.stringify(newUserObject) in updateDatabase(): ${JSON.stringify(updatedUser)}`)

    let updatedBody = updatedUser == null ? user : updatedUser;
    //console.log(`JSON.stringify(updatedBody): ${JSON.stringify(updatedBody)}`);
    const res = await fetch(`https://damp-forest-55138.herokuapp.com/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedBody)
    })

    const data = await res.json(); //returned from the server - this is ALL data for the given user

    console.log(`data returned from server after updateDatabase(): ${JSON.stringify(data)}`);

    // purpose of creating 'newUser' below and setting state of 'user' = 'newUser' is to force the GroceryList component to re-render. Had I merely done `setUser(user)` instead, this would only point setUser to the same OBJECT REFERENCE of 'user' (despite the fact that I updated one of the 'user' object's properties). This way I'm actually updating the state of 'user' to point to a different object (newUser) and thus the component re-renders. This fixed the issue of the just-deleted grocery item still remaining on the UI after hitting the delete button.
    let newUser = updatedUser == null ? { ...user } : {...updatedUser};
    setUser(newUser);
  }

  // function to update state of 'userName' string and 'user' object for whichever user is now 'in session'
  function updateUserSession(userName, user) {
    setUserName(userName);
    console.log(`userName set to: ${userName}`);
    setUser(user);
    //console.log(`user set to: ${JSON.stringify(user)}`);

    //reset state of AddItem, EditItem, and EditUser to 'false' - this hides these edit forms in case they were open at the time when the Change User button was clicked
    setShowAddItem(false);
    setShowEditItem(false);
    setShowEditUser(false);
    setShowAddUser(false);

    /* Below block is for debugging only */
    // let currentGroceryItems = JSON.stringify(user.groceryListItems);
    // console.log(`groceryItems for ${userName}: ${currentGroceryItems}`);
    /* Above block is for debugging only */
  }

  const addItem = async (newItem, userId) => {
    console.log(`received newItem: ${JSON.stringify(newItem)} in addItem() function`);
    //First run a check through all the existing grocery item names to ensure the NEW item name does not already exist.

    // create a variable 'indexOfDuplicate' to represent whether the newItem already exists in this user's list - in which case, the edit won't be allowed/saved

    //to handle case where a brand new user is receiving thier first grocery item to add, I'm creating a blank array to represend their grocery items
    //if (!user.groceryListItems) user.groceryListItems = [];

    const indexOfDuplicate = user.groceryListItems?.findIndex(item => item.itemName.toLowerCase() == newItem.itemName.toLowerCase());
    console.log(`indexOfDuplicate is: ${indexOfDuplicate}`);

    //if the newName already exists in this user's list, alert them and return without adding the new item.
    if (indexOfDuplicate !== -1) {
      window.alert('This item name is already in your list, please choose a different name');
      return;
    }

    //otherwise, add the new item to the user's grocery list and update state accordingly
    console.log(`adding new item: ${JSON.stringify(newItem)} to userId: ${userId}`);

    let updatedUser = {...user, groceryListItems: [...user.groceryListItems, newItem]};
    console.log(`updatedUser: ${JSON.stringify(updatedUser)}`);
    setUser(updatedUser);

    //call updateDatabase function to update 'user' in the db
    updateDatabase(userId, updatedUser);
  }

  // EDIT a single grocery item from a given user's list
  const editItem = async (newItem, oldItemName) => {
    const userId = user._id;
    let newItemName = newItem.itemName;
    console.log(`newItemName: ${newItemName}`);
    console.log(`oldItemName: ${oldItemName}`);
    //First run a check through all the existing grocery item names to ensure the NEW item name does not already exist.

    // create a variable 'indedOfDuplicate' to represent whether the newItem already exists in this user's list - in which case, the edit won't be allowed/saved
    const indexOfDuplicate = user.groceryListItems.findIndex(item => item.itemName.toLowerCase() == newItem.itemName.toLowerCase());
    console.log(`indexOfDuplicate is: ${indexOfDuplicate}`);

    //if the newName already exists in this user's list, alert them and return without editing the item.
    if ((indexOfDuplicate !== -1) && (newItemName !== oldItemName)) {
      window.alert('This item name is already in your list, please choose a different name');
      return;
    }

    //otherwise, edit the item and update the database

    console.log(`newItem object received to editItem function in App.js: ${JSON.stringify(newItem)} for userId: ${userId}`);
    console.log(`user still: ${JSON.stringify(user)}`);
    console.log(`old item name: ${oldItemName}`)

    // find the index of the old grocery item (by its name)
    const index = user.groceryListItems.findIndex(item => item.itemName == oldItemName);
    console.log(`index: ${index}`);

    // update user object by replacing the old grocery item with the new one (and leaving the other grocery items unmodified)
    user.groceryListItems[index] = newItem;

    //update state of 'user' object
    let newUser = { ...user };
    setUser(newUser);

    console.log(`user is now: ${JSON.stringify(user)}`);

    /* 
    //The below state update is already happening in 'updateDatabase()' so I don't think it's needed here - CAN DELETE after further testing
    //update state of user
    // let updatedUser = { ...user };
    // setUser(updatedUser);
    */

    //call updateDatabase function to update 'user' in the db
    updateDatabase(userId);
  }

  //Edit the user itself (i.e. just the user's name for now)
  const editUser = async (newName) => {
    console.log(`editUser function in App.js successfully called`);
    const userId = user._id;
    let oldName = user.name;

    /* SET NEW NAME TO THE USER OBJECT HERE */
    console.log(`oldName: ${oldName}`);
    console.log(`newName passed to editUser: ${newName}`);

    console.log(`ZZZZ CURRENT user object is: ${JSON.stringify(user)}`);

    //update user object's name to the new name (note this doesn't actually modify the STATE of 'user' yet)
    user.name = newName;

    //now modify the state of 'user' object by creating a new object and setting it to a spread of the values of 'user'
    let newUser = { ...user };
    console.log(`newUser is now: ${JSON.stringify(newUser)}`);
    setUser(newUser);

    console.log(`newly set user object is: ${JSON.stringify(user)}`);

    //call updateDatabase function to update 'user' in the db
    updateDatabase(userId);
    setUserName(user.name);
  }

  // ADD NEW USER
  //Add a brand new user to the db (only requires the new user's name)
  const addUser = async (newName) => {
    //console.log(`addUser function in App.js successfully called`);
    //console.log(`newName actually passed to addUser: ${newName}`);

    let newUser = { ...user, "name": newName };
    //console.log(`newUser is now: ${JSON.stringify(newUser)}`);


    //now add the newUser object to the db here...then continue with the below (of setting the new user)
    const res = await fetch(`https://damp-forest-55138.herokuapp.com/users/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })

    const updatedUser = await res.json();
    //console.log(`data returned from server: ${JSON.stringify(updatedUser)}`);

    //now modify the state of 'user' object by creating a new object and setting it to a spread of the values of 'user'
    setUser(updatedUser);
    //console.log(`newly set user object is: ${JSON.stringify(user)}`);
    setUserName(updatedUser.name);
  }
  // END ADD NEW USER

  // BEGIN DELETE USER
  const deleteUser = async (userId) => {
    console.log(`userId passed to deleteUser function in App.js is: ${userId}`);

    const res = await fetch(`https://damp-forest-55138.herokuapp.com/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })

    const data = await res.json();
    console.log(`data returned from server: ${JSON.stringify(data)}`);

    //now reset 'user' object to blank/null
    setUser([]);
    setUserName('');
  }
  // END DELETE USER

  // DELETE a single grocery item from a given user's list
  const onDelete = (itemId = null, itemName) => {
    console.log(`ready to delete grocery item ID: ${itemId}`)
    console.log(`ready to delete grocery itemName: ${itemName}`)
    console.log(`typeof itemId: ${typeof itemId}`);
    console.log(`itemId == null:  ${itemId == null}`);
    console.log(`itemId == '':  ${itemId == ''}`);
    //find the grocery list item (by id) and remove it from the 'user' object
    //console.log(`updated 'user' is now: ${JSON.stringify(user)}`);

    let userId = user._id;
    //console.log(`userId: ${userId}`);

    let filteredGroceryListItems = (itemId) ? 
    user.groceryListItems.filter((currentItem) => currentItem._id != itemId)
    : user.groceryListItems.filter((currentItem) => currentItem.itemName != itemName)

    //console.log(`updated groceryListItem array will be: ${JSON.stringify(filteredGroceryListItems)}`);

    //!!!need to refactor this to update the actual state, not the local variable - TODO
    user.groceryListItems = filteredGroceryListItems;

    //console.log(`newly updated 'user' object will be set to: ${JSON.stringify(user)}`);

    //call updateDatabase function to update 'user' in the db
    updateDatabase(userId);
  }

  // TOGGLE reminder to be the opposite of whatever it was previously
  const onToggle = async (groceryItemId) => {
    console.log(`onToggle called for groceryItemId: (${groceryItemId})`);

    // loop through each grocery list item and flip 'reminder' to be the opposite of whatever it was for the specific groceryItemId that is passed into the function
    user.groceryListItems.forEach((item) => {
      if (item._id === groceryItemId) {
        item.reminder = !item.reminder;
      }
    })
    console.log(`updated user.groceryListItems = ${JSON.stringify(user.groceryListItems)}`);

    let userId = user._id;
    //call updateDatabase function to update 'user' in the db
    updateDatabase(userId);
  }

  const updateVisibilityFilter = (newVisibility) => {
    console.log(`updateVisibilityFilter called with newVisibility: ${newVisibility}`);
    setVisibilityFilter(newVisibility);
  }

  // Update STATE for a single grocery item
  const editGroceryItem = async (groceryItemId, groceryItemName, groceryItemAisle, groceryItemReminder) => {
    //auto-scroll to the top of the page so the EditItem form is visible / obvious to the user
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    console.log(`editGroceryItem function called`)
    console.log(`editing Grocery Item ID: ${groceryItemId}`);
    setGroceryItemId(groceryItemId);
    setGroceryItemName(groceryItemName);
    setGroceryItemAisle(groceryItemAisle);
    setGroceryItemReminder(groceryItemReminder);
  }

  return (
    <div className="container">
      <Header title='Grocery List'
        onAdd={() => setShowAddItem(!showAddItem)}
        user={user}
        showAddItem={showAddItem}
        userName={userName}
        allUserData={allUserData}
        updateUserSession={updateUserSession}
        visibilityFilter={visibilityFilter}
        updateVisibilityFilter={updateVisibilityFilter}
        onEdit={editUser}
        onEditShow={() => setShowEditUser(!showEditUser)}
        onAddShow={() => setShowAddUser(!showAddUser)}
      />


      {isLoading && (
        <div className="pulse-loader">
          <PulseLoader
            color='blue'
            size='30px'
            margin='17px'
          />
        </div>
      )}


      {showAddItem && <AddItem
        onAdd={addItem}
        onSave={() => setShowAddItem(!showAddItem)}
        userId={user._id}
      />}

      {showEditItem && <EditItem
        user={user}
        groceryItemId={groceryItemId}
        groceryItemName={groceryItemName}
        groceryItemAisle={groceryItemAisle}
        groceryItemReminder={groceryItemReminder}
        editItem={editItem}
        onSave={() => setShowEditItem(!showEditItem)}
        showEditItem={showEditItem}
      />}

      {showEditUser && <EditUser
        user={user}
        onSave={() => setShowEditUser(!showEditUser)}
        showEditUser={showEditUser}
        onEdit={editUser}
        onDelete={deleteUser}
      />}

      {showAddUser && <AddUser
        user={user}
        onSave={() => setShowAddUser(!showAddUser)}
        showAddUser={showAddUser}
        onAddUser={addUser}
        allUserNames={allUserNames}
      />}

      {(user.groceryListItems != undefined) && (
        <GroceryItems groceryListItems={user.groceryListItems}
          onDelete={onDelete}
          onToggle={onToggle}
          visibilityFilter={visibilityFilter}
          editGroceryItem={editGroceryItem}
          onEdit={() => setShowEditItem(!showEditItem)}
          showEditItem={showEditItem}
        />
      )}
    </div>
  );
}

Header.defaultProps = {
  title: 'Awesome Grocery-List Tracker'//just here to illustrate that if I didn't pass any props to <Header />, then the default prop would be 'Awesome Grocery-List Tracker'
}

export default App;