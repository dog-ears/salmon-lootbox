import React from 'react';
import './Conpane.scss';

interface PropsInterface {
  onGacha: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export default function Conpane(props: PropsInterface) {
  return (
    <div id="conpane" className="container">
      <div><button onClick={props.onGacha}>ガチャを引く</button></div>
    </div>
  );
}
