import React from 'react';
import './Conpane.scss';

interface PropsInterface {
}

export default function Conpane(props: PropsInterface) {
  return (
    <div id="conpane" className="container">
      <div><button>ガチャを引く</button></div>
    </div>
  );
}
