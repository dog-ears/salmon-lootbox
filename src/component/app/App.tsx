import React from 'react';

// スタイル
import './App.scss';

// クラス
import Weapons from 'class/Weapons';

export default class App extends React.Component<{}, RootStateInterface> {
  constructor(props: {}) {
    super(props);
    this.state = {
      weaponInventory: Weapons.getAll().map((w) => {
        return {
          weaponId: w.id,
          amount: 0
        };
      }),
    }
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <h1><span className="dib">サーモンラン</span> <span className="dib">ブキガチャ</span></h1>
        </div>
        <div className="container">
          <h2>ブキリスト</h2>
          <div className="myWeapon">
            <ul>
              {this.state.weaponInventory.map((wi: WeaponInventoryInterface) => {
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
