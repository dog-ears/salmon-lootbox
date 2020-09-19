import React from 'react';
import './ModalGachaResult.scss';

interface PropsInterface {
}

export default function ModalGachaResult(props: PropsInterface) {
  return (
    <div id="gachaResult" className="modalBg">
      <div className="modalOuter">
        <h2>結果</h2>
      </div>
    </div>
  );
}
