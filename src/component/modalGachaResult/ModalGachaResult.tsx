import React from 'react';
import './ModalGachaResult.scss';

interface PropsInterface {
  onCloseModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function ModalGachaResult(props: PropsInterface) {
  return (
    <div id="gachaResult" className="modalBg">
      <div className="modalOuter">
        <h2>結果</h2>
        <div className="btn"><button onClick={props.onCloseModal}>閉じる</button></div>
      </div>
    </div>
  );
}
