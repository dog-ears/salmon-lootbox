import React from 'react';

// スタイル
import './App.scss';

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
      weaponInventory: [],
    }
  }

  render() {
    return (
      <div className="app">
        <h1>appのh1</h1>
        <h2>h2テスト</h2>
        <ul>
          <li>liテスト</li>
          <li>liテスト</li>
          <li>liテスト</li>
        </ul>
      </div>
    );
  }
}
