import { History } from './history.entity';

export const historysProviders = [
  {
    provide: 'HISTORIES_REPOSITORY',
    useValue: History,
  },
];
