import React from 'react';

// スタイル
import './App.scss';

// コンポーネント
import Setting from 'component/setting/Setting';
import Conpane from 'component/conpane/Conpane';
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
      filter: {
        type: 0,
        own: 0,
      }
    }
  }

  /* ------------------------------------------------------
  各種ボタン等押したときの処理
  ------------------------------------------------------ */

  // セッティング変更
  private onChangeSetting = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {

    // イベントを非同期で使えるようにする処理
    event.persist();

    this.setState(
      (state) => {

        // キー取得
        let key = event.target.id;

        // deep copy
        let newState = JSON.parse(JSON.stringify(state));

        newState.setting[key] = parseInt(event.target.value);
        return newState;
      }
    );
  }

  // フィルタリング変更
  private onChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {

    // イベントを非同期で使えるようにする処理
    event.persist();

    this.setState(
      (state) => {

        // キー取得
        let key = event.target.id;

        // deep copy
        let newState = JSON.parse(JSON.stringify(state));

        newState.filter[key] = parseInt(event.target.value);
        return newState;
      }
    );
  }

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

  /**
   * 下記条件に応じた武器インベントリを取得する
   * （１）選択していないクマブキを除外
   * （２）state.filterの条件で絞り込む
   * @return {WeaponInventoryInterface[]}       フィルタリングされた武器インベントリ
   */
  private getFilteredWeaponInventory = (typeId?: number, ownId?: number): WeaponInventoryInterface[] => {

    // typeIdとownIdの設定
    if (typeId === undefined) {
      typeId = this.state.filter.type;
    }
    if (ownId === undefined) {
      ownId = this.state.filter.own;
    }

    // deep copy
    let filteredWeaponInventory: WeaponInventoryInterface[] = JSON.parse(JSON.stringify(this.state.weaponInventory));

    // （１）クマブキ選択が「全て」じゃなかった場合、選択していないクマブキを除外
    if (this.state.setting.choice !== 0) {
      filteredWeaponInventory = filteredWeaponInventory.filter((wi) => {
        if (
          (Weapons.getById(wi.weaponId).isKuma) && // クマブキでかつ、
          (wi.weaponId !== this.state.setting.choice) // 選択したクマブキIDと違っていたら、
        ) {
          return false; // 除外する
        }
        return true;
      });
    }

    // （２）state.filterの条件で絞り込む
    // 種類（type）
    if (typeId !== 0) {
      filteredWeaponInventory = filteredWeaponInventory.filter((wi) => {
        return Weapons.getById(wi.weaponId).typeId === typeId;
      });
    }
    // 所持（own）
    if (ownId === 1) {  // 未取得
      filteredWeaponInventory = filteredWeaponInventory.filter((wi) => {
        return wi.amount === 0
      });
    } else if (ownId === 2) {  // 取得済み
      filteredWeaponInventory = filteredWeaponInventory.filter((wi) => {
        return wi.amount > 0
      });
    }

    // 結果を返却
    return filteredWeaponInventory
  }

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
        <Setting
          choice={this.state.setting.choice}
          rate={this.state.setting.rate}
          onChange={this.onChangeSetting}
        />
        <Conpane />
        <WeaponList
          weaponInventory={this.getFilteredWeaponInventory()}
          filter={this.state.filter}
          onChangeFilter={this.onChangeFilter}
          onClickPlusMinus={this.onClickPlusMinus}
          getFilteredWeaponInventory={this.getFilteredWeaponInventory}
        />
      </div>
    );
  }
}
