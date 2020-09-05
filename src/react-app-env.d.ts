/// <reference types="react-scripts" />

/* --------------------------------------------------
Root State
-------------------------------------------------- */

interface RootStateInterface {
  weaponInventory: WeaponInventoryInterface[],
}
interface WeaponInventoryInterface {
  weaponId: number,
  amount: number,
}
