function ModifySuccess(props) {
  const timeout = setTimeout(() => {
    props.setComp("Info");
  }, 3000);
  const setInfo = () => {
    clearTimeout(timeout)
    props.setComp("Info");
  }

  return (
    <div className='adminEditSuccessPage'>
      <div className="adminEditSuccessContainer">
        <div className='adminEditSuccessBackBtnArea'>
          <button className='adminEditSuccessBackButton' onClick={setInfo}>X</button>
        </div>
        <div className="adminEditSuccessLineArea">
          <p>정보가 수정되었습니다.</p>          
        </div>
      </div>
    </div>
  )
}

export default ModifySuccess;