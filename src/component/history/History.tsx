import React from 'react';

// スタイル
import './History.scss';

// クラス
import Weapons from 'class/Weapons';

interface PropsInterface {
  histories: HistoryInterface[],
}

export default function History(props: PropsInterface) {

  let historiesCopy: HistoryInterface[] = JSON.parse(JSON.stringify(props.histories));  // reverse()が破壊的なので、コピーで処理する。
  const myHistory = historiesCopy.reverse().map((h, i) => {
    if (h.type === 0) { //  ガチャの履歴
      return (
        <li key={i}>「{Weapons.getById(h.weaponId).name}」を<br className="hidePc" />ガチャで引きました。</li>
      );
    } else if (h.type === 1) { // マニュアル増減
      return (
        <li key={i}>「{Weapons.getById(h.weaponId).name}」を<br className="hidePc" />{h.amount > 0 ? ' +1 しました' : ' -1 しました'}</li>
      );
    }
    return null;
  });

  // ガチャ回数取得
  const gachaCount: number = props.histories.filter((h) => h.type === 0).length;

  return (
    <div id="history" className="m-container">
      <h2>履歴</h2>
      <div className="gachaCount">ガチャを引いた回数：{gachaCount}</div>
      {props.histories.length > 0 &&
        <div className="data">
          <ul>
            {myHistory}
          </ul>
        </div>
      }
    </div>
  );
}
