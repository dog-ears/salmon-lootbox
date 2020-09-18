import React from 'react';
import './WeaponList.scss';

// class
import Weapons from 'class/Weapons';
import weaponFilter from 'class/weaponFilter';

// component
import App from 'component/app/App';

interface PropsInterface {
  weaponInventory: WeaponInventoryInterface[],
  filter: FilterInterface,
  onChangeFilter: App["onChangeFilter"],
  onClickPlusMinus: App["onClickPlusMinus"],
  getFilteredWeaponInventory: (typeId?: number, ownId?: number) => WeaponInventoryInterface[],
}

export default function WeaponList(props: PropsInterface) {
  return (
    <div id="weaponList" className="container">
      <h2>ブキリスト</h2>
      <div className="filter">
        <dl>
          <dt>武器の種類（取得済み武器数/全武器数）：</dt>
          <dd>
            <select id="type" value={props.filter.type} onChange={props.onChangeFilter}>
              {weaponFilter.getAll().type.map((t) => {
                return (
                  <option key={t.id} value={t.id}>{t.title}({props.getFilteredWeaponInventory(t.id, 2).length}/{props.getFilteredWeaponInventory(t.id, 0).length})</option>
                )
              })}
            </select>
          </dd>
        </dl>
        <dl>
          <dt>所持 ：</dt>
          <dd>
            <select id="own" value={props.filter.own} onChange={props.onChangeFilter}>
              {weaponFilter.getAll().own.map((o) => {
                return (
                  <option key={o.id} value={o.id}>{o.name}</option>
                )
              })}
            </select>
          </dd>
        </dl>
      </div>
      <div className="myWeapon">
        <ul>
          {props.weaponInventory.map((wi: WeaponInventoryInterface) => {
            return (
              <li
                key={wi.weaponId}
                className={Weapons.getById(wi.weaponId).filename + ((wi.amount === 0) ? ' notOwn' : '')}
              >
                <div className='name'>{Weapons.getById(wi.weaponId).name}（{wi.amount}）</div>
                <div className='button'>
                  {wi.amount > 0 &&
                    <button className="minus" onClick={props.onClickPlusMinus} data-weaponid={wi.weaponId} data-amount="-1">-</button>
                  }
                  <button className="plus" onClick={props.onClickPlusMinus} data-weaponid={wi.weaponId} data-amount="1">+</button>
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
