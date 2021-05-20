import { Board } from './board';
import { Card } from './card';
import { List } from './list';

export type BoardApi = Board & {
  lists: Array<
    List & {
      cards: Card[];
    }
  >;
};
