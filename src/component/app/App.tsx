import React from 'react';

// スタイル
import './App.scss';

// コンポーネント
import WeaponList from 'component/weaponList/WeaponList';

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
        <WeaponList
          weaponInventory={this.state.weaponInventory}
        />
      </div>
    );
  }
}
