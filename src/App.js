//import React from 'react'; //only needed for class components; not used here
import Header from './components/Header';

function App() {

  return (
    <div className="container">
      <Header title='Task Tracker - updated' /> {/* passing 'Task tracker' as a prop to <Header /> component */}
    </div>
  );
}

Header.defaultProps = {
  title: 'Awesome Task Tracker'//just here to illustrate that if I didn't pass any props to <Header />, then the default prop would be 'Awesome Task Tracker'
}

export default App;