import React from 'react';

// スタイル
import './App.scss';

// コンポーネント
import Setting from 'component/setting/Setting';
import Conpane from 'component/conpane/Conpane';
import WeaponList from 'component/weaponList/WeaponList';
import ModalGachaResult from 'component/modalGachaResult/ModalGachaResult';
import ModalStatistics from 'component/modalStatistics/ModalStatistics';
import ModalComplete from 'component/modalComplete/ModalComplete';
import History from 'component/history/History';

// クラス
import Weapons from 'class/Weapons';

export default class App extends React.Component<{}, RootStateInterface> {
  constructor(props: {}) {
    super(props);

    // ローカルストレージにデータがあれば、そこからロード。なければ初期値を設定
    let localState = this.loadState();
    if (localState) {
      this.state = localState;
    } else {
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
        },
        histories: [],
        modalState: {
          modalComplete: false,
          modalGachaResult: false,
          modalStatistics: false,
        },
        droppedWeaponId: 0,
        isNew: false,
      }
    }
  }

  // キーイベントの設定
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyDown.bind(this));
  }

  // キーイベント
  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {

      // モーダルを閉じる
      this.onCloseModal(e);
    }
  }

  // ローカルストレージに保存
  private saveState = () => {
    const jsonStr: string = JSON.stringify(this.state);
    localStorage.setItem('salmon-lootbox', jsonStr);
  }

  // ローカルストレージから読み込み
  private loadState = (): RootStateInterface | null => {
    const jsonStr: string | null = localStorage.getItem('salmon-lootbox');
    if (jsonStr) {
      const loadState: RootStateInterface = Object.assign({
        weaponInventory: [],
        setting: {
          choice: 51,
          rate: 25,
        },
        filter: {
          type: 0,
          own: 0,
        },
        histories: [],
        droppedWeaponId: 0,
        isNew: false,
      }, JSON.parse(jsonStr));

      // モーダルはすべて閉じた状態にする
      loadState.modalState = {
        modalComplete: false,
        modalGachaResult: false,
        modalStatistics: false,
      }
      return loadState;
    } else {
      return null;
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
      }, this.saveState
    );
  }

  // ガチャを押したときの処理
  private onGacha = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // ボタンのフォーカス解除
    event.currentTarget.blur();

    // ランダム武器の取得
    let droppedWeapon = Weapons.getRandomWeapon(this.state.setting);

    // 取得したランダム武器が初出かどうかを取得
    let isNew = false;
    this.state.weaponInventory.map((wi) => {
      if (wi.weaponId === droppedWeapon.id) {
        if (wi.amount === 0) {
          isNew = true;
        }
      }
      return true;
    });

    // 取得した武器でコンプリートしたかをチェック
    let isLastOne = this.isLastOne(droppedWeapon.id)

    // ランダム武器IDとisNewを格納
    this.setState({
      droppedWeaponId: droppedWeapon.id,
      isNew: isNew,
    });

    // インベントリの増減処理を呼ぶ
    this.changeWeaponInventoryAmount(droppedWeapon.id, 1);

    // ヒストリの追加
    this.addHistory({ type: 0, weaponId: droppedWeapon.id, amount: 1 });

    // コンプリートなら、コンプリートモーダルを、
    // コンプリートでなければ、ガチャ結果モーダルを開く
    if (isLastOne) {
      this.setState(
        (state) => {

          // deep copy
          let newState: RootStateInterface = JSON.parse(JSON.stringify(state));

          newState.modalState.modalComplete = true;
          return newState;
        }
      );
    } else {
      // ガチャ結果モーダルを開く
      this.setState(
        (state) => {

          // deep copy
          let newState: RootStateInterface = JSON.parse(JSON.stringify(state));

          newState.modalState.modalGachaResult = true;
          return newState;
        }
      );
    }
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
        newState.filter = {
          type: 0,
          own: 0,
        };
        newState.histories = [];
        return newState;
      }, this.saveState
    );
  }

  // 統計を押したときの処理
  private onStatistics = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // ボタンのフォーカス解除
    event.currentTarget.blur();

    // 統計モーダルを開く
    this.setState(
      (state) => {

        // deep copy
        let newState: RootStateInterface = JSON.parse(JSON.stringify(state));

        newState.modalState.modalStatistics = true;
        return newState;
      }
    );
  }

  // モーダルを閉じる
  private onCloseModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent) => {

    // モーダルを閉じる
    this.setState(
      (state) => {

        // deep copy
        let newState: RootStateInterface = JSON.parse(JSON.stringify(state));

        newState.modalState.modalComplete = false;
        newState.modalState.modalGachaResult = false;
        newState.modalState.modalStatistics = false;
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
      }, this.saveState
    );
  }

  // 武器リストの「+」「-」をおした時の処理
  private onClickPlusMinus = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

    event.persist();  // イベントを非同期で使えるようにする

    // datasetに「weaponId」と「amount」がなかったら何もしない
    if (event.currentTarget.dataset.weaponid === undefined || event.currentTarget.dataset.amount === undefined) { return }

    // 取得した武器でコンプリートしたかをチェック
    let isLastOne = this.isLastOne(parseInt(event.currentTarget.dataset.weaponid))

    // インベントリの増減処理を呼ぶ
    this.changeWeaponInventoryAmount(parseInt(event.currentTarget.dataset.weaponid), parseInt(event.currentTarget.dataset.amount));

    // ヒストリの追加
    this.addHistory({
      type: 1,
      weaponId: parseInt(event.currentTarget.dataset.weaponid),
      amount: parseInt(event.currentTarget.dataset.amount),
    });

    // コンプリートなら、コンプリートモーダルを開く
    if (isLastOne) {
      this.setState(
        (state) => {

          // deep copy
          let newState: RootStateInterface = JSON.parse(JSON.stringify(state));

          newState.modalState.modalComplete = true;
          return newState;
        }
      );
    }
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

            // 武器数を増やす（減らす）
            wi.amount += amount;

            // -1になってしまったときの処理
            if (wi.amount < 0) {
              wi.amount = 0;
            }
          }
          return wi;
        });

        return newState;
      }, this.saveState
    );
  }

  /**
   * ヒストリーの追加
   * @param  {HistoryInterface} history 追加するヒストリ
   */
  private addHistory = (history: HistoryInterface) => {
    this.setState(
      (state) => {
        let newState: RootStateInterface = JSON.parse(JSON.stringify(state));
        newState.histories.push(history);
        return newState;
      }, this.saveState
    );
  }

  /**
   * 最後の一つかチェック
   * @param  {number} wid 取得した武器ID
   */
  private isLastOne = (wid: number): boolean => {

    // 結果
    let result = true;

    this.getFilteredWeaponInventory(0, 0).map((wi) => {

      if (wi.weaponId === wid) {

        // 取得した武器の所持数が0以外なら、false
        if (wi.amount !== 0) {
          result = false;
        }
      } else {

        // 取得した武器以外の武器の所持数が0だったら、false
        if (wi.amount === 0) {
          result = false;
        }
      }
      return false;
    });

    return result;
  }

  render() {
    return (
      <div id="app">
        <div className="m-container">
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
        <History
          histories={this.state.histories}
        />
        <div className="m-container" id="specialThanks">
          Special Thanks.<br /><a href="https://twitter.com/gungeespla" target="_blank" rel="noopener noreferrer">ガンジー(@GungeeSpla)さん</a>
        </div>
        <div id="modal">
          {this.state.modalState.modalComplete === true &&
            <ModalComplete
              weaponInventoryOwn={this.getFilteredWeaponInventory(0, 2)}
              histories={this.state.histories}
              onCloseModal={this.onCloseModal}
            />
          }
          {this.state.modalState.modalGachaResult === true &&
            <ModalGachaResult
              droppedWeapon={Weapons.getById(this.state.droppedWeaponId)}
              isNew={this.state.isNew}
              onCloseModal={this.onCloseModal}
            />
          }
          {this.state.modalState.modalStatistics === true &&
            <ModalStatistics
              weaponInventoryOwn={this.getFilteredWeaponInventory(0, 2)}
              onCloseModal={this.onCloseModal}
            />
          }
        </div>
      </div>
    );
  }
}
