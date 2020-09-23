import React from 'react';
import './Conpane.scss';

interface PropsInterface {
  onGacha: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onReset: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onStatistics: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export default function Conpane(props: PropsInterface) {
  return (
    <div id="conpane" className="container">
      <div><button onClick={props.onGacha}>ガチャを引く</button></div>
      <div><button onClick={props.onReset}>リセットする</button></div>
      <div><button onClick={props.onStatistics}>統計をみる</button></div>
    </div>
  );
}
