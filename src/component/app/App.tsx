import React from 'react';

// スタイル
import './App.scss';

// クラス
import Weapons from 'class/Weapons';

interface StateInterface {
  weaponInventory: WeaponInventoryInterface[],
}
interface WeaponInventoryInterface {
  weaponId: number,
  amount: number,
}

export default class App extends React.Component<{}, StateInterface> {
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
              {this.state.weaponInventory.map((data: WeaponInventoryInterface) => {
                return <li>{data.weaponId}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
