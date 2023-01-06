//import React from 'react'; //only needed for class components; not used here
import { useState, useEffect } from 'react'
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import GroceryItems from '../GroceryItems/GroceryItems';
import EditItem from '../EditItem/EditItem';
import EditUser from '../EditUser/EditUser';

const App = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [allUserData, setallUserData] = useState([]); // object to hold the entirety of all data from my API
  const [allUserNames, setAllUserNames] = useState([]); // an array to hold all unique user names
  const [userName, setUserName] = useState(''); // string to hold the current user name that is 'in session'
  const [user, setUser] = useState([]); // array to hold all data for only the current user who is 'in session'
  const [visibilityFilter, setVisibilityFilter] = useState('all');

  // Below states are used for editing a single grocery item for the in-session user
  const [groceryItemId, setGroceryItemId] = useState('');// stores an individual grocery item ID to be used with the editGroceryItem function
  const [groceryItemName, setGroceryItemName] = useState('');// stores an individual grocery item ID to be used with the editGroceryItem function
  const [groceryItemAisle, setGroceryItemAisle] = useState('');// stores an individual grocery item Aisle to be used with the editGroceryItem function
  const [groceryItemReminder, setGroceryItemReminder] = useState('');// stores an individual grocery item Reminder boolean to be used with the editGroceryItem function

  //On initial page load, retrieve all users from my api server and update state of 'allUserData' accordingly
  useEffect(() => {
    const getallUserData = async () => {
      //console.log(`getallUserData called`);
      const allUserData = await fetchUsers();
      setallUserData(allUserData);
    }
    getallUserData();
  }, [])

  //Fetch full list of all grocery items from the server and return the response as json
  const fetchUsers = async () => {
    const res = await fetch('https://damp-forest-55138.herokuapp.com/users');
    const data = await res.json();
    //console.log(data);
    //console.log(`data from server: ${JSON.stringify(data)}`);
    return data;
  }

  //takes in a userId and updates the 'user' object in the database to match whatever the current state of 'user' in App.js is. This works because this function will only be called AFTER state of 'user' has been updated in App.js.
  const updateDatabase = async (userId) => {
    console.log(`updateDatabase function called in App.js`);
    const res = await fetch(`https://damp-forest-55138.herokuapp.com/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const data = await res.json(); //returned from the server - this is ALL data for the given user

    console.log(`data returned from server: ${JSON.stringify(data)}`);

    // purpose of creating 'newUser' below and setting state of 'user' = 'newUser' is to force the GroceryList component to re-render. Had I merely done `setUser(user)` instead, this would only point setUser to the same OBJECT REFERENCE of 'user' (despite the fact that I updated one of the 'user' object's properties). This way I'm actually updating the state of 'user' to point to a different object (newUser) and thus the component re-renders. This fixed the issue of the just-deleted grocery item still remaining on the UI after hitting the delete button.
    let newUser = { ...user };
    setUser(newUser);
  }

  // function to update state of 'userName' string and 'user' object for whichever user is now 'in session'
  function updateUserSession(userName, user) {
    setUserName(userName);
    console.log(`userName set to: ${userName}`);
    setUser(user);
    //console.log(`user set to: ${JSON.stringify(user)}`);

    let currentGroceryItems = JSON.stringify(user.groceryListItems);
    console.log(`groceryItems for ${userName}: ${currentGroceryItems}`);
  }

  const addItem = async (newItem, userId) => {
    //First run a check through all the existing grocery item names to ensure the NEW item name does not already exist.

    // create a variable 'indedOfDuplicate' to represent whether the newItem already exists in this user's list - in which case, the edit won't be allowed/saved
    const indexOfDuplicate = user.groceryListItems.findIndex(item => item.itemName.toLowerCase() == newItem.itemName.toLowerCase());
    console.log(`indexOfDuplicate is: ${indexOfDuplicate}`);

    //if the newName already exists in this user's list, alert them and return without adding the new item.
    if (indexOfDuplicate !== -1) {
      window.alert('This item name is already in your list, please choose a different name');
      return;
    }

    //otherwise, add the new item to the user's grocery list
    console.log(`adding new item: ${JSON.stringify(newItem)} to userId: ${userId}`);
    user.groceryListItems.push(newItem);

    console.log(`updated 'user' is now: ${JSON.stringify(user)}`);

    //call updateDatabase function to update 'user' in the db
    updateDatabase(userId);
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


  // DELETE a single grocery item from a given user's list
  const onDelete = async (itemId) => {
    console.log(`ready to delete grocery item ID: ${itemId}`)
    //find the grocery list item (by id) and remove it from the 'user' object
    //console.log(`updated 'user' is now: ${JSON.stringify(user)}`);

    let userId = user._id;
    //console.log(`userId: ${userId}`);

    let filteredGroceryListItems = user.groceryListItems.filter((currentItem) => currentItem._id != itemId);

    //console.log(`updated groceryListItem array will be: ${JSON.stringify(filteredGroceryListItems)}`);

    user.groceryListItems = filteredGroceryListItems;

    console.log(`newly updated 'user' object will be set to: ${JSON.stringify(user)}`);

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

    /* 
    //The below state update is already happening in 'updateDatabase()' so I don't think it's needed here - CAN DELETE after further testing
    //update state of user
    // let updatedUser = { ...user };
    // setUser(updatedUser);
    */

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
        showAddItem={showAddItem}
        userName={userName}
        allUserData={allUserData}
        updateUserSession={updateUserSession}
        visibilityFilter={visibilityFilter}
        updateVisibilityFilter={updateVisibilityFilter}
        onEdit={editUser}
        onEditShow={() => setShowEditUser(!showEditUser)}
      />
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
      />}

      {user.groceryListItems != undefined ? <GroceryItems groceryListItems={user.groceryListItems}
        onDelete={onDelete}
        onToggle={onToggle}
        visibilityFilter={visibilityFilter}
        editGroceryItem={editGroceryItem}
        onEdit={() => setShowEditItem(!showEditItem)}
        showEditItem={showEditItem}

      />
        : (
          'No grocery items to show'
        )}
    </div>
  );
}

Header.defaultProps = {
  title: 'Awesome Grocery-List Tracker'//just here to illustrate that if I didn't pass any props to <Header />, then the default prop would be 'Awesome Grocery-List Tracker'
}

export default App;