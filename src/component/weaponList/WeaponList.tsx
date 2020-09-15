import React from 'react';
import './WeaponList.scss';

// class
import Weapons from 'class/Weapons';
import weaponFilter from 'class/weaponFilter';

// component
import App from 'component/app/App';

interface PropsInterface {
  weaponInventory: WeaponInventoryInterface[],
  onClickPlusMinus: App["onClickPlusMinus"],
}

interface StateInterface {
  filter: {
    type: number,
    own: number,
  },
}

export default class WeaponList extends React.Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      filter: {
        type: 0,
        own: 0,
      }
    };
  }

  render() {
    return (
      <div id="weaponList" className="container">
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
                  <div className='button'>
                    {wi.amount > 0 &&
                      <button className="minus" onClick={this.props.onClickPlusMinus} data-weaponid={wi.weaponId} data-amount="-1">-</button>
                    }
                    <button className="plus" onClick={this.props.onClickPlusMinus} data-weaponid={wi.weaponId} data-amount="1">+</button>
                  </div>
                </li>
              )
            })}
            <li className="blank"></li>
            <li className="blank"></li>
            <li className="blank"></li>
            <li className="blank"></li>
            <li className="blank"></li>
            <li className="blank"></li>
            <li className="blank"></li>
            <li className="blank"></li>
          </ul>
        </div>
      </div>
    );
  }

}
