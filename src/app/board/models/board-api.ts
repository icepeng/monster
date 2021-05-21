import { Board } from './board';
import { Card } from './card';
import { CardLabel } from './card-label';
import { Comment } from './comment';
import { Label } from './label';
import { List } from './list';

export interface BoardApi {
  board: Board;
  lists: List[];
  cards: Card[];
  labels: Label[];
  cardLabels: CardLabel[];
  comments: Comment[];
}
