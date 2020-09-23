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
    <div id="statistics" className="modalBg">
      <div className="modalOuter">
        <h2>統計</h2>
        <div className="totalAmount">所持武器数 ： {props.weaponInventoryOwn.length} 種類 {total} 個</div>
        {total > 0 &&
          <div className="list">
            <ul>
              <li className="tableHeader">
                <ul>
                  <li className="name"><span>武器</span></li>
                  <li className="amount">数</li>
                  <li className="rate">出現率</li>
                </ul>
              </li>
              {props.weaponInventoryOwn
                .sort((a, b) => { return (a.amount < b.amount) ? 1 : -1 })
                .map((wi) => {
                  return (
                    <li key={wi.weaponId}>
                      <ul>
                        <li className="name"><span className={Weapons.getById(wi.weaponId).filename}>{Weapons.getById(wi.weaponId).name}</span></li>
                        <li className="amount">{wi.amount}</li>
                        <li className="rate">{Math.floor(wi.amount / total * 10000) / 100}%</li>
                      </ul>
                    </li>
                  );
                })}
            </ul>
          </div>
        }
        <div className="btn"><button onClick={props.onCloseModal}>閉じる</button></div>
      </div>
    </div>
  );
}
