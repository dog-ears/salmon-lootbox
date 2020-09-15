/// <reference types="react-scripts" />

/* --------------------------------------------------
Root State
-------------------------------------------------- */

interface RootStateInterface {
  weaponInventory: WeaponInventoryInterface[],
  setting: SettingInterface,
}
interface WeaponInventoryInterface {
  weaponId: number,
  amount: number,
}
interface SettingInterface {
  choice: number,
  rate: number,
}
