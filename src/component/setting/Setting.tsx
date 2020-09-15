import React from 'react';

// スタイル
import './Setting.scss';

// クラス
import Weapons from 'class/Weapons';

interface PropsInterface {
}

export default function Setting(props: PropsInterface) {
  return (
    <div id="setting" className="container">
      <h2>セッティング</h2>
      <dl>
        <dt>出現するクマブキ ：</dt>
        <dd>
          <select id="choice" value="0">
            <option value="0">全て</option>
            {Weapons.getKuma().map((w) =>
              <option key={w.id} value={w.id}>{w.name}</option>
            )}
          </select>
        </dd>
      </dl>
      <dl>
        <dt>クマブキの出現確率 ：</dt>
        <dd><input id="rate" type="number" value="25" />％</dd>
      </dl>
    </div>
  );
}
