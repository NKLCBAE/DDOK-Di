import React from 'react';
import createToDoModalCancelIcon from "../assets/backArrow.png";
import './ToDoCreateModal.css';

const ToDoEditModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className='createToDoModalPage'>

    
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="myTodoCreateModalContainer">
          <header>
            <button className="createToDoModalClose" onClick={close}>
              <img src={createToDoModalCancelIcon} alt="createToDoModalCancelIcon" className="createToDoModalCancelIcon" />
            </button>            
            {header}
          </header>
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
    </div>
  );
};

export default ToDoEditModal
