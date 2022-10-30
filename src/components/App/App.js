//import React from 'react'; //only needed for class components; not used here
import { useState, useEffect } from 'react'
import Header from '../Header/Header';
import Tasks from '../Tasks/Tasks';
import AddTask from '../AddTask/AddTask';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]); //keep this line if the mock data in db.json file actually works. If it fails, delete this line and uncomment the below
  const [user, setUser] = useState('Select User');
  // const [tasks, setTasks] = useState(
  //   [
  //     {
  //       id: 1,
  //       text: 'Watermelon',
  //       aisle: 7,
  //       reminder: true
  //     },
  //     {
  //       id: 2,
  //       text: 'Pizza',
  //       aisle: 16,
  //       reminder: false
  //     },
  //     {
  //       id: 3,
  //       text: 'Soup',
  //       aisle: 'Deli',
  //       reminder: false
  //     },
  //     {
  //       id: 4,
  //       text: 'Crackers',
  //       aisle: '4',
  //       reminder: true
  //     }
  //   ]
  // )

  //On initial page load, retrieve users from my api server and update state of 'users' accordingly
  useEffect(() => {
    const getUsers = async () => {
      console.log(`getUsers called`);
      const tasksFromServer = await fetchUsers();
      setTasks(tasksFromServer);
    }
    getUsers();
  }, [])

  //Fetch full list of all grocery items from the server and return the response as json
  const fetchUsers = async () => {
    const res = await fetch('https://damp-forest-55138.herokuapp.com/users');
    const data = await res.json();
    console.log(data);
    //console.log('data stringified: ' + JSON.stringify(data));
    return data;
  }

  //Fetch a single grocery item object from the server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    console.log(data);
    return data;
  }

  //Add a task (grocery item)
  const addTask = async (task) => {
    console.log(`adding new task: ${JSON.stringify(task)}`);
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json(); //the data that will be returned is just the new task that has been added

    setTasks([...tasks, data]);// now update state of 'tasks' to be what it was before, plus the new task that was just created. This is basically just appending the new task to the end of the current task-list array.

    /* one manual way to create an ID below - commented out - by just generating a random number between 1 and 10,000 to represent the 'unique' ID */
    // const id = Math.floor(Math.random() * 10000) + 1;
    // console.log(`id= ${id}`);
    // const newTask = { id, ...task };
    // console.log(`newTask:`, newTask);
    // setTasks([...tasks, newTask]);
  }

  //Delete a task (grocery item)
  const deleteTask = async (id) => {
    //first delete the task from the mock server, then filter it out from the UI
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    console.log(`will delete: `, id);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  //Toggle reminder on/off
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }; //just making a copy of the existing task but setting the 'reminder' value to the opposite of whatever it currently was

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <div className="container">
      <Header title='Grocery List'
        onAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
        user={user}
      />
      {showAddTask && <AddTask onAdd={addTask} onSave={() => setShowAddTask(!showAddTask)} />}
      {tasks.length > 0 ? <Tasks tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleReminder}
      />
        : (
          'No tasks to show'
        )}
    </div>
  );
}

Header.defaultProps = {
  title: 'Awesome Task Tracker'//just here to illustrate that if I didn't pass any props to <Header />, then the default prop would be 'Awesome Task Tracker'
}

export default App;