export interface Card {
  id: string;
  listId: string;
  index: number;
  title: string;
  description: string;
  due: string | null;
  dueComplete: boolean;
}
