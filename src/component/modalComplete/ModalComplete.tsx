import React from 'react';
import { TwitterIcon, TwitterShareButton } from 'react-share';

// スタイル
import './ModalComplete.scss';

// クラス
import Weapons from 'class/Weapons';

interface PropsInterface {
  weaponInventoryOwn: WeaponInventoryInterface[],
  histories: HistoryInterface[],
  onCloseModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function ModalGachaResult(props: PropsInterface) {

  // 手動で追加したヒストリの数を取得
  let historyManualCount = props.histories.filter((h) => {
    return (h.type === 1 && h.amount > 0);
  }).length;

  // ガチャを引いたヒストリの数を取得
  let historyGachaCount = props.histories.filter((h) => {
    return (h.type === 0);
  }).length;

  // ゲーム数、ゲーム時間の取得
  let countGame = Math.ceil(historyGachaCount / 3);
  let gameTime = countGame * 8;
  let gameTimeHour = Math.floor(gameTime / 60);
  let gameTimeMinute = gameTime % 60;

  // 最も出た武器（クマブキのぞく。上限3個まで）のリスト取得
  let prevAmount: number = 0;
  let mostCountWeapons: WeaponInventoryInterface[] = props.weaponInventoryOwn
    .sort((a, b) => { return (a.amount < b.amount) ? 1 : -1 })
    .filter((wi) => {
      if (prevAmount === 0 || prevAmount === wi.amount) {
        prevAmount = wi.amount;
        if (Weapons.getById(wi.weaponId).isKuma) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });

  // ツイート文言生成
  console.log(mostCountWeapons);
  const mostWeaponName = Weapons.getById(mostCountWeapons[0].weaponId).name;
  let tweetText: string = `サーモンラン ブキガチャ

  手動で増やした回数：${historyManualCount} 回
  回したガチャの回数：${historyGachaCount} 回
  バイト回数：${countGame} 回
  かかった時間：${gameTimeHour} 時間 ${gameTimeMinute} 分
  最も出た武器 / 回数：
  ${mostWeaponName} / ${mostCountWeapons[0].amount} 回
  `;

  return (
    <div id="modalComplete" className="m-modal">
      <div className="mc-modalInner">
        <h2>おめでとうございます！<br />武器コンプリートしました！！</h2>
        <div className="txt">手動で増やした回数：{historyManualCount} 回</div>
        <div className="txt">回したガチャの回数：{historyGachaCount} 回</div>
        <div className="txt">バイト回数：{countGame} 回<br />かかった時間：{gameTimeHour} 時間 {gameTimeMinute} 分</div>
        <div className="note">※ガチャ回数から計算。全勝の場合<br />※1バイト8分計算</div>

        <div className="txt">
          <p>最も出た武器 / 回数：</p>
          <ul>
            {mostCountWeapons.map((wi, i) => {
              if (i < 3) {
                return (
                  <li key={wi.weaponId}>
                    <span className={Weapons.getById(wi.weaponId).filename}>{Weapons.getById(wi.weaponId).name} / {wi.amount} 回</span>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
        <div className="note">※クマブキはのぞく。３つまで</div>
        <div className="twitterMsg">結果をツイートする</div>
        <div className="twitterBtn">
          <TwitterShareButton url="https://salmon-lootbox.dog-ears.net/" title={tweetText} hashtags={['サーモンランブキガチャ']}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <div className="mc-btn"><button onClick={props.onCloseModal}>閉じる</button></div>
      </div>
    </div>
  );
}
