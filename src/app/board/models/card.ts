export interface Card {
  id: number;
  listId: number;
  index: number;
  title: string;
  description: string;
  due: string | null;
  dueComplete: boolean;
}
