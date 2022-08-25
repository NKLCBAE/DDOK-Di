import './ReadModal.css'
import React from 'react'
import cardReadingImg from '../assets/nfcCardReadBlack.png'

function ReadModal(props) {
  function closeModal() {
    props.closeModal();
  }
  function modalBodyEventControl(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={modalBodyEventControl}>
        <img src={cardReadingImg} alt='cardReadingImg' className='cardReadingImg'/>
        <p>사용할 회원증을 리더기에 대주세요</p>
        <button className="ContinueButton" onClick={closeModal}>
          계속하기
        </button>
      </div>
    </div>
  );
}

export default ReadModal