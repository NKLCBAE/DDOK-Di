import React from 'react';
import editToDoModalCancelIcon from "../assets/backArrow.png";
import './ToDoEditModal.css';

const ToDoEditModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className='editToDoModalPage'>

    
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="myTodoEditModalContainer">
          <header>
            <button className="editToDoModalClose" onClick={close}>
              <img src={editToDoModalCancelIcon} alt="editToDoModalCancelIcon" className="editToDoModalCancelIcon" />
            </button>
            <p>{header}</p>
            <div className='editSrOnly'>s</div>
          </header>
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
    </div>
  );
};

export default ToDoEditModal
