//import React from 'react'; //only needed for class components; not used here
import { useState, useEffect } from 'react'
import Header from '../Header/Header';
//import Tasks from '../Tasks/Tasks';
import AddItem from '../AddItem/AddItem';
import GroceryItems from '../GroceryItems/GroceryItems';

const App = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [allUserData, setallUserData] = useState([]); // object to hold the entirety of all data from my API
  const [allUserNames, setAllUserNames] = useState([]); // an array to hold all unique user names
  const [userName, setUserName] = useState(''); // string to hold the current user name that is 'in session'
  const [user, setUser] = useState([]); // array to hold all data for only the current user who is 'in session'

  //On initial page load, retrieve all users from my api server and update state of 'allUserData' accordingly
  useEffect(() => {
    const getallUserData = async () => {
      console.log(`getallUserData called`);
      const allUserData = await fetchUsers();
      setallUserData(allUserData);
      //console.log(`allUserData: ${JSON.stringify(allUserData)}`);
    }
    getallUserData();
  }, [])



  // function to update state of 'userName' string and 'user' object for whichever user is now 'in session'
  function updateUserSession(userName, user, groceryListItems) {
    setUserName(userName);
    console.log(`userName set to: ${userName}`);
    setUser(user);
    console.log(`user set to: ${JSON.stringify(user)}`);

    let currentGroceryItems = JSON.stringify(user.groceryListItems);
    console.log(`groceryItems for ${userName}: ${currentGroceryItems}`);
  }

  //Fetch full list of all grocery items from the server and return the response as json
  const fetchUsers = async () => {
    const res = await fetch('https://damp-forest-55138.herokuapp.com/users');
    const data = await res.json();
    console.log(data);
    //console.log('data stringified: ' + JSON.stringify(data));
    return data;
  }

  console.log(`user.groceryListItems (from App.js) is: ${JSON.stringify(user.groceryListItems)}`);

  const addItem = async (newItem, userId) => {
    console.log(`adding new item: ${JSON.stringify(newItem)} to userId: ${userId}`);
    user.groceryListItems.push(newItem);

    console.log(`updated 'user' is now: ${JSON.stringify(user)}`);
    const res = await fetch(`https://damp-forest-55138.herokuapp.com/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const data = await res.json(); //the data that will be returned is just the new item that has been successfully added

    console.log(`data returned from server: ${JSON.stringify(data)}`);

    //setUser(user);// now update state of 'user' which
  }

  return (
    <div className="container">
      <Header title='Grocery List'
        onAdd={() => setShowAddItem(!showAddItem)}
        showAddItem={showAddItem}
        userName={userName}
        allUserData={allUserData}
        updateUserSession={updateUserSession}
      />
      {showAddItem && <AddItem
        onAdd={addItem}
        onSave={() => setShowAddItem(!showAddItem)}
        userId={user._id}
      />}

      {user.groceryListItems != undefined ? <GroceryItems groceryListItems={user.groceryListItems}
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