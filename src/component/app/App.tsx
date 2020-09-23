import React from 'react';
import ReactDOM from 'react-dom';

// スタイル
import './App.scss';

// コンポーネント
import Setting from 'component/setting/Setting';
import Conpane from 'component/conpane/Conpane';
import WeaponList from 'component/weaponList/WeaponList';
import ModalGachaResult from 'component/modalGachaResult/ModalGachaResult';
import ModalStatistics from 'component/modalStatistics/ModalStatistics';

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

  // ガチャを押したときの処理
  private onGacha = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // ボタンのフォーカス解除
    event.currentTarget.blur();

    // ランダム武器の取得
    let droppedWeapon = Weapons.getRandomWeapon(this.state.setting);

    // インベントリの増減処理を呼ぶ
    this.changeWeaponInventoryAmount(droppedWeapon.id, 1);

    // ガチャ結果モーダルを開く
    ReactDOM.render(<ModalGachaResult
      droppedWeapon={droppedWeapon}
      onCloseModal={this.onCloseModal}
    />, document.getElementById('modal'));
  }

  // リセットを押したときの処理
  private onReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // ボタンのフォーカス解除
    event.currentTarget.blur();

    // 確認
    let confirmReset: boolean = window.confirm('データをリセットします。よろしいですか？');
    if (!confirmReset) {
      return false;
    }

    // ステートのリセット処理
    this.setState(
      (state) => {
        let newState: RootStateInterface = JSON.parse(JSON.stringify(state));
        newState.weaponInventory = newState.weaponInventory.map((wi) => {
          wi.amount = 0;
          return wi;
        });
        return newState;
      }
    );
  }

  // 統計を押したときの処理
  private onStatistics = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // ボタンのフォーカス解除
    event.currentTarget.blur();

    // 統計モーダルを開く
    ReactDOM.render(<ModalStatistics
      weaponInventoryOwn={this.getFilteredWeaponInventory(0, 2)}
      onCloseModal={this.onCloseModal}
    />, document.getElementById('modal'));
  }

  // モーダルを閉じる
  private onCloseModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // モーダルを閉じる
    let modalElement = document.getElementById('modal');
    if (modalElement !== null) {
      ReactDOM.unmountComponentAtNode(modalElement);
    }
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
        <Conpane
          onGacha={this.onGacha}
          onReset={this.onReset}
          onStatistics={this.onStatistics}
        />
        <WeaponList
          weaponInventory={this.getFilteredWeaponInventory()}
          filter={this.state.filter}
          onChangeFilter={this.onChangeFilter}
          onClickPlusMinus={this.onClickPlusMinus}
          getFilteredWeaponInventory={this.getFilteredWeaponInventory}
        />
        <div id="modal"></div>
      </div>
    );
  }
}
