//import React from 'react'; //only needed for class components; not used here
import { useState } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const App = () => {
  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: 'Watermelon',
        aisle: 7,
        reminder: true
      },
      {
        id: 2,
        text: 'Pizza',
        aisle: 16,
        reminder: false
      },
      {
        id: 3,
        text: 'Soup',
        aisle: 'Deli',
        reminder: false
      },
      {
        id: 4,
        text: 'Crackers',
        aisle: '4',
        reminder: true
      }
    ]
  )

  //Add a task (grocery item)

  const addTask = (task) => {
    console.log(`adding new task: ${JSON.stringify(task)}`);

    //for now, just generate a random number between 1 and 10,000 to represent the 'unique' ID
    const id = Math.floor(Math.random() * 10000) + 1;
    console.log(`id= ${id}`);

    const newTask = { id, ...task };
    console.log(`newTask:`, newTask);
    setTasks([...tasks, newTask]);
  }

  //Delete a task (grocery item)
  const deleteTask = (id) => {
    console.log(`will delete: `, id);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  //Toggle reminder on/off
  const toggleReminder = (id) => {
    console.log(id);
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header title='Task Tracker' /> {/* passing 'Task tracker' as a prop to <Header /> component */}
      <AddTask onAdd={addTask} />
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