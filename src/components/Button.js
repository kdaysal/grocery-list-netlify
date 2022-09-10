import PropTypes from 'prop-types'

const Button = ({ btnText, btnColor, onClick }) => {


  return (
    <div>
      <button className='btn'
        style={{ backgroundColor: btnColor }}
        onClick={onClick}
      >{btnText}
      </button>
    </div>
  )
}

Button.defaultProps = {
  color: 'steelblue'
}

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  btnColor: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
