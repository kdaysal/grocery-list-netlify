//import React from 'react'; //only needed for class components; not used here
import { useState } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';

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

  //Delete a task
  const deleteTask = (id) => {
    console.log(`will delete: `, id)
  }

  return (
    <div className="container">
      <Header title='Task Tracker' /> {/* passing 'Task tracker' as a prop to <Header /> component */}
      <Tasks tasks={tasks}
        onDelete={deleteTask}
      />
    </div>
  );
}

Header.defaultProps = {
  title: 'Awesome Task Tracker'//just here to illustrate that if I didn't pass any props to <Header />, then the default prop would be 'Awesome Task Tracker'
}

export default App;