import React from 'react';

// スタイル
import './ModalGachaResult.scss';

// インターフェース
import { WeaponDataInterface } from 'class/Weapons';

interface PropsInterface {
  droppedWeapon: WeaponDataInterface,
  isNew: boolean,
  onCloseModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function ModalGachaResult(props: PropsInterface) {

  return (
    <div id="gachaResult" className="m-modal">
      <div className="mc-modalInner">
        <h2>結果</h2>
        <div className="photo"><span className={props.droppedWeapon.filename}></span></div>
        {props.isNew === true &&
          <div className="new"><span>NEW</span></div>
        }
        <div className="name">{props.droppedWeapon.name}</div>
        <div className="mc-btn"><button onClick={props.onCloseModal}>閉じる</button></div>
      </div>
    </div>
  );
}
