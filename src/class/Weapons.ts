interface WeaponDataInterface {
  id: number,
  name: string,
  filename: string,
  typeId: number,
  isKuma: boolean,
}

export default class Weapons {

  static getAll = (): WeaponDataInterface[] => Weapons.data;

  static getById = (id: number): WeaponDataInterface => {
    return Weapons.data.filter((w) => {
      return w.id === id;
    })[0];
  }
  static getKuma = (): WeaponDataInterface[] => {
    return Weapons.data.filter((w) => w.isKuma);
  }
  static getNotKuma = (): WeaponDataInterface[] => {
    return Weapons.data.filter((w) => !w.isKuma);
  }

  static getRandomWeapon = (setting: SettingInterface): WeaponDataInterface => {

    // 当たる可能性のあるクマブキリストの取得
    let kuma: WeaponDataInterface[] = Weapons.getKuma();
    if (setting.choice !== 0) {
      kuma = kuma.filter((k: WeaponDataInterface) => k.id === setting.choice);
    }

    // クマブキが出たかの判定
    let rand: number = Math.floor(Math.random() * 100); // 0～99の乱数

    if (rand < setting.rate) {  // クマブキ当たりのとき
      if (kuma.length > 1) {
        let rand: number = Math.floor(Math.random() * kuma.length);
        return kuma[rand];
      } else {
        return kuma[0];
      }
    } else {
      let notKuma: WeaponDataInterface[] = Weapons.getNotKuma();
      let rand: number = Math.floor(Math.random() * notKuma.length);
      return notKuma[rand];
    }
  }

  private static data: WeaponDataInterface[] = [
    {
      id: 1,
      name: 'ボールドマーカー',
      filename: 'boldMarker',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 2,
      name: 'わかばシューター',
      filename: 'wakabaShooter',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 3,
      name: 'シャープマーカー',
      filename: 'sharpMarker',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 4,
      name: 'プロモデラーMG',
      filename: 'promodelerMg',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 5,
      name: 'スプラシューター',
      filename: 'splaShooter',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 6,
      name: '.52ガロン',
      filename: 'w52Galon',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 7,
      name: 'N-ZAP85',
      filename: 'n-zap85',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 8,
      name: 'プライムシューター',
      filename: 'primeShooter',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 9,
      name: '.96ガロン',
      filename: 'w96Galon',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 10,
      name: 'ジェットスイーパー',
      filename: 'jetSweeper',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 11,
      name: 'ノヴァブラスター',
      filename: 'novaBlaster',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 12,
      name: 'ホットブラスター',
      filename: 'hotBlaster',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 13,
      name: 'ロングブラスター',
      filename: 'longBlaster',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 14,
      name: 'クラッシュブラスター',
      filename: 'crushBlaster',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 15,
      name: 'ラピッドブラスター',
      filename: 'rapidBlaster',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 16,
      name: 'Rブラスターエリート',
      filename: 'rBlasterElite',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 17,
      name: 'L3リールガン',
      filename: 'l3Reelgun',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 18,
      name: 'H3リールガン',
      filename: 'h3Reelgun',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 19,
      name: 'ボトルガイザー',
      filename: 'bottleGaiser',
      typeId: 1,
      isKuma: false,
    },
    {
      id: 20,
      name: 'カーボンローラー',
      filename: 'carbonRoller',
      typeId: 5,
      isKuma: false,
    },
    {
      id: 21,
      name: 'スプラローラー',
      filename: 'splaRoller',
      typeId: 5,
      isKuma: false,
    },
    {
      id: 22,
      name: 'ダイナモローラー',
      filename: 'dynamoRoller',
      typeId: 5,
      isKuma: false,
    },
    {
      id: 23,
      name: 'ヴァリアブルローラー',
      filename: 'variableRoller',
      typeId: 5,
      isKuma: false,
    },
    {
      id: 24,
      name: 'パブロ',
      filename: 'pablo',
      typeId: 5,
      isKuma: false,
    },
    {
      id: 25,
      name: 'ホクサイ',
      filename: 'hokusai',
      typeId: 5,
      isKuma: false,
    },
    {
      id: 26,
      name: 'スクイックリンα',
      filename: 'squickrinA',
      typeId: 4,
      isKuma: false,
    },
    {
      id: 27,
      name: 'スプラチャージャー',
      filename: 'splaCharger',
      typeId: 4,
      isKuma: false,
    },
    {
      id: 28,
      name: 'スプラスコープ',
      filename: 'splaScope',
      typeId: 4,
      isKuma: false,
    },
    {
      id: 29,
      name: 'リッター4K',
      filename: 'litter4k',
      typeId: 4,
      isKuma: false,
    },
    {
      id: 30,
      name: '4Kスコープ',
      filename: 'w4kScope',
      typeId: 4,
      isKuma: false,
    },
    {
      id: 31,
      name: '14式竹筒銃・甲',
      filename: 'take',
      typeId: 4,
      isKuma: false,
    },
    {
      id: 32,
      name: 'ソイチューバー',
      filename: 'soiTuber',
      typeId: 4,
      isKuma: false,
    },
    {
      id: 33,
      name: 'バケットスロッシャー',
      filename: 'bucketSlother',
      typeId: 6,
      isKuma: false,
    },
    {
      id: 34,
      name: 'ヒッセン',
      filename: 'hissen',
      typeId: 6,
      isKuma: false,
    },
    {
      id: 35,
      name: 'スクリュースロッシャー',
      filename: 'screwSlother',
      typeId: 6,
      isKuma: false,
    },
    {
      id: 36,
      name: 'オーバーフロッシャー',
      filename: 'overFlosher',
      typeId: 6,
      isKuma: false,
    },
    {
      id: 37,
      name: 'エクスプロッシャー',
      filename: 'explosher',
      typeId: 6,
      isKuma: false,
    },
    {
      id: 38,
      name: 'スプラスピナー',
      filename: 'splaSpiner',
      typeId: 7,
      isKuma: false,
    },
    {
      id: 39,
      name: 'バレルスピナー',
      filename: 'barelSpiner',
      typeId: 7,
      isKuma: false,
    },
    {
      id: 40,
      name: 'ハイドラント',
      filename: 'hydrant',
      typeId: 7,
      isKuma: false,
    },
    {
      id: 41,
      name: 'クーゲルシュライバー',
      filename: 'cugelShuraiber',
      typeId: 7,
      isKuma: false,
    },
    {
      id: 42,
      name: 'ノーチラス47',
      filename: 'nautilus47',
      typeId: 7,
      isKuma: false,
    },
    {
      id: 43,
      name: 'スパッタリー',
      filename: 'spattary',
      typeId: 3,
      isKuma: false,
    },
    {
      id: 44,
      name: 'スプラマニューバー',
      filename: 'splaManeuver',
      typeId: 3,
      isKuma: false,
    },
    {
      id: 45,
      name: 'ケルビン525',
      filename: 'kelbin525',
      typeId: 3,
      isKuma: false,
    },
    {
      id: 46,
      name: 'デュアルスイーパー',
      filename: 'dualSweeper',
      typeId: 3,
      isKuma: false,
    },
    {
      id: 47,
      name: 'クアッドホッパーブラック',
      filename: 'quadHopperBlack',
      typeId: 3,
      isKuma: false,
    },
    {
      id: 48,
      name: 'パラシェルター',
      filename: 'paraShelter',
      typeId: 2,
      isKuma: false,
    },
    {
      id: 49,
      name: 'キャンピングシェルター',
      filename: 'campingShelter',
      typeId: 2,
      isKuma: false,
    },
    {
      id: 50,
      name: 'スパイガジェット',
      filename: 'spyGadjet',
      typeId: 2,
      isKuma: false,
    },
    {
      id: 51,
      name: 'クマサン印のブラスター',
      filename: 'kumaBlaster',
      typeId: 1,
      isKuma: true,
    },
    {
      id: 52,
      name: 'クマサン印のシェルター',
      filename: 'kumaShelter',
      typeId: 2,
      isKuma: true,
    },
    {
      id: 53,
      name: 'クマサン印のチャージャー',
      filename: 'kumaCharger',
      typeId: 4,
      isKuma: true,
    },
    {
      id: 54,
      name: 'クマサン印のスロッシャー',
      filename: 'kumaSlosher',
      typeId: 6,
      isKuma: true,
    },
  ];
}
