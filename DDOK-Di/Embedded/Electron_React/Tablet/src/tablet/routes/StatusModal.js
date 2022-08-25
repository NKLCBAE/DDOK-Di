import React from 'react';
import statusCancelIcon from "../assets/cancelWhite.png";
import './StatusModal.css';

const statusModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    <div className='statusModalPage'>

    
    {/* 모달이 열릴때 openModal 클래스가 생성된다. */}
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          {/* <header>
            {header}
            <button className="closeState" onClick={close}>
              &times;
            </button>
          </header> */}
          <main>{props.children}</main>
          <footer>
            <button className="closeState" onClick={close}>
              <img src={statusCancelIcon} alt="statusCancelIcon" className="statusCancelIcon" />
            </button>
          </footer>
        </section>
      ) : null}
    </div>
    </div>
  );
};

export default statusModal
