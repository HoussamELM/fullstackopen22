const NoSuccess = ({ errmessage }) => {
    if (errmessage === null) {
      return null
    }
  
    return (
      <div className="nosuccess">
        {errmessage}
      </div>
    )
  }
  
  export default NoSuccess