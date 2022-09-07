import PropTypes from 'prop-types'//prop-types is totally optional for a small app like this - I'm adding it here for reference


const Header = ({ title }) => {
  return (
    <header>
      <h1 style={{ color: 'red', backgroundColor: 'black' }}>{title}</h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

//For sake of example - you can define styles like this...
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black'
// }
//and if I wanted to call them, the syntax would be like this: <h1 style={headingStyle}>{title}</h1>


export default Header