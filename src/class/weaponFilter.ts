interface WeaponFilterInterface {
  type: WeaponFilterTypeInterface[],
  own: WeaponFilterOwnInterface[],
}
interface WeaponFilterTypeInterface {
  id: number,
  name: string,
  title: string,
}
interface WeaponFilterOwnInterface {
  id: number,
  name: string,
}

export default class WeaponFilter {

  static getAll = (): WeaponFilterInterface => WeaponFilter.data;

  private static data: WeaponFilterInterface = {
    type: [{
      id: 0,
      name: 'all',
      title: '全て'
    }, {
      id: 1,
      name: 'shooter',
      title: 'シューター'
    }, {
      id: 2,
      name: 'shelter',
      title: 'シェルター'
    }, {
      id: 3,
      name: 'maneuver',
      title: 'マニューバー'
    }, {
      id: 4,
      name: 'charger',
      title: 'チャージャー'
    }, {
      id: 5,
      name: 'roller',
      title: 'ローラー'
    }, {
      id: 6,
      name: 'slosher',
      title: 'スロッシャー'
    }, {
      id: 7,
      name: 'spinner',
      title: 'スピナー'
    }],
    own: [{
      id: 0,
      name: '全て',
    }, {
      id: 1,
      name: '未取得',
    }, {
      id: 2,
      name: '取得済み',
    }],
  }
}
