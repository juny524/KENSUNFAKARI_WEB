import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: '大会メニュー',
    icon: 'layout-outline',
    children: [
      {
        title: '大会作成',
        link: '/pages/layout/stepper',
      },
      {
        title: '大会一覧',
        link: '/pages/layout/list',
      },
    ],
  },
];
