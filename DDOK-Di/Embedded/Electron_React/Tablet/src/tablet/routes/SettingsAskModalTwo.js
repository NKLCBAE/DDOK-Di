import React from 'react';
// import editToDoModalCancelIcon from "../assets/backArrow.png";
import './SettingsAskModal.css';

const SettingsAskModalThree = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className='settingsModalPage'>
      <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (

      <main className='settingsModalContainer'>{props.children}</main>
      ) : null}
    </div>
    </div>
  );
};

export default SettingsAskModalThree