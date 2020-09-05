import React from 'react';
import './WeaponList.scss';

// class
import Weapons from 'class/Weapons';

interface PropsInterface {
  weaponInventory: WeaponInventoryInterface[],
}

export default class WeaponList extends React.Component<PropsInterface, {}> {

  render() {
    return (
      <div className="weaponList">
        <div className="container">
          <h2>ブキリスト</h2>
          <div className="myWeapon">
            <ul>
              {this.props.weaponInventory.map((wi: WeaponInventoryInterface) => {
                return (
                  <li
                    key={wi.weaponId}
                    className={Weapons.getById(wi.weaponId).filename + ((wi.amount === 0) ? ' notOwn' : '')}
                  >
                    <div className='name'>{Weapons.getById(wi.weaponId).name}（{wi.amount}）</div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}
