import React from 'react';

// スタイル
import './App.scss';

// コンポーネント
import Setting from 'component/setting/Setting';
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
      setting: {
        choice: 51,
        rate: 25,
      },
    }
  }

  /* ------------------------------------------------------
  各種ボタン等押したときの処理
  ------------------------------------------------------ */

  // 武器リストの「+」「-」をおした時の処理
  private onClickPlusMinus = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

    event.persist();  // イベントを非同期で使えるようにする

    // datasetに「weaponId」と「amount」がなかったら何もしない
    if (event.currentTarget.dataset.weaponid === undefined || event.currentTarget.dataset.amount === undefined) { return }

    // インベントリの増減処理を呼ぶ
    this.changeWeaponInventoryAmount(parseInt(event.currentTarget.dataset.weaponid), parseInt(event.currentTarget.dataset.amount));
  }

  /* ------------------------------------------------------
  その他処理
  ------------------------------------------------------ */

  // 武器インベントリ増減
  private changeWeaponInventoryAmount = (weaponId: number, amount: number): void => {
    this.setState(
      (state) => {

        // deep copy
        let newState: RootStateInterface = JSON.parse(JSON.stringify(state));

        // stateの更新
        newState.weaponInventory = newState.weaponInventory.map((wi) => {
          if (wi.weaponId === weaponId) {
            wi.amount += amount;

            // -1になってしまったときの処理
            if (wi.amount < 0) {
              wi.amount = 0;
            }
          }
          return wi;
        });
        return newState;
      }
    );
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <h1><span className="dib">サーモンラン</span> <span className="dib">ブキガチャ</span></h1>
        </div>
        <Setting />
        <WeaponList
          weaponInventory={this.state.weaponInventory}
          onClickPlusMinus={this.onClickPlusMinus}
        />
      </div>
    );
  }
}
