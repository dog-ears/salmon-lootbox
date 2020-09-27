import React from 'react';
import './ModalStatistics.scss';

// class
import Weapons from 'class/Weapons';

interface PropsInterface {
  weaponInventoryOwn: WeaponInventoryInterface[],
  onCloseModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export default function ModalStatistics(props: PropsInterface) {

  //  武器合計数を取得
  let total: number = 0;
  props.weaponInventoryOwn.map((wi) => {
    total += wi.amount;
    return false;
  });

  return (
    <div id="statistics" className="m-modal">
      <div className="mc-modalInner">
        <h2>統計</h2>
        <div className="totalAmount">所持武器数 ： {props.weaponInventoryOwn.length} 種類 {total} 個</div>
        {total > 0 &&
          <div>
            <div className="tableHeader">武器名（所持数/出現率）</div>
            <div className="list">
              <ul>
                {props.weaponInventoryOwn
                  .sort((a, b) => { return (a.amount < b.amount) ? 1 : -1 })
                  .map((wi) => {
                    return (
                      <li key={wi.weaponId}>
                        <span className={Weapons.getById(wi.weaponId).filename}>{Weapons.getById(wi.weaponId).name}<br className="hidePc" />（{wi.amount} / {Math.floor(wi.amount / total * 10000) / 100}%）</span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        }
        <div className="mc-btn"><button onClick={props.onCloseModal}>閉じる</button></div>
      </div>
    </div>
  );
}
