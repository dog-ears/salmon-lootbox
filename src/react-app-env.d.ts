/// <reference types="react-scripts" />

/* --------------------------------------------------
Root State
-------------------------------------------------- */

interface RootStateInterface {
  weaponInventory: WeaponInventoryInterface[],
  setting: SettingInterface,
  filter: FilterInterface,
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
