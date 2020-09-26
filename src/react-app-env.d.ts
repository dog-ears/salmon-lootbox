/// <reference types="react-scripts" />

/* --------------------------------------------------
Root State
-------------------------------------------------- */

interface RootStateInterface {
  weaponInventory: WeaponInventoryInterface[],
  setting: SettingInterface,
  filter: FilterInterface,
  histories: HistoryInterface[],
}
interface WeaponInventoryInterface {
  weaponId: number,
  amount: number,
}
interface SettingInterface {
  choice: number,
  rate: number,
}
interface FilterInterface {
  type: number,
  own: number,
}
interface HistoryInterface {
  /**
   * 履歴の種類（0:ガチャ, 1:マニュアル）
   * @type {Number}
   */
  type: number,
  weaponId: number,
  amount: number,
}
