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
  type: number, // 0:ガチャ, 1:マニュアル
  weaponId: number,
  amount: number,
}
