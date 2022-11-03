//import React from 'react'; //only needed for class components; not used here
import { useState, useEffect } from 'react'
import Header from '../Header/Header';
import Tasks from '../Tasks/Tasks';
import AddTask from '../AddTask/AddTask';
import GroceryItems from '../GroceryItems/GroceryItems';

const App = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [groceryItems, setGroceryItems] = useState([]); //keep this line if the mock data in db.json file actually works. If it fails, delete this line and uncomment the below
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
  function updateUserSession(userName, user) {
    setUserName(userName);
    console.log(`userName set to: ${userName}`);
    setUser(user);
    console.log(`user set to: ${JSON.stringify(user)}`);
  }

  //Fetch full list of all grocery items from the server and return the response as json
  const fetchUsers = async () => {
    const res = await fetch('https://damp-forest-55138.herokuapp.com/users');
    const data = await res.json();
    console.log(data);
    //console.log('data stringified: ' + JSON.stringify(data));
    return data;
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

      {groceryItems.length > 0 ? <GroceryItems groceryItems={groceryItems}
      />
        : (
          'No grocery items to show'
        )}
    </div>
  );
}

Header.defaultProps = {
  title: 'Awesome Grocery-List Tracker'//just here to illustrate that if I didn't pass any props to <Header />, then the default prop would be 'Awesome Task Tracker'
}

export default App;