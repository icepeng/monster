import { Card, List } from '../models';

interface Indexable {
  index: number;
}

interface ListItem {
  index: number;
  listId: string;
}

function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}

function reindex<T extends Indexable>(arr: T[]): T[] {
  return arr.map((item, index) => ({
    ...item,
    index: index,
  }));
}

export function moveItemIndex<T extends Indexable>(
  array: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  const newArray = [...array].sort((a, b) => a.index - b.index);
  const from = clamp(fromIndex, array.length - 1);
  const to = clamp(toIndex, array.length - 1);

  if (from === to) {
    return newArray;
  }

  const target = newArray[from];
  const delta = to < from ? -1 : 1;

  for (let i = from; i !== to; i += delta) {
    newArray[i] = newArray[i + delta];
  }

  newArray[to] = target;

  return reindex(newArray);
}

export function transferArrayItem<T extends ListItem>(
  currentArray: T[],
  targetArray: T[],
  currentIndex: number,
  targetIndex: number,
  targetListId: string
): T[] {
  const current = [...currentArray].sort((a, b) => a.index - b.index);
  const target = [...targetArray].sort((a, b) => a.index - b.index);
  const from = clamp(currentIndex, currentArray.length - 1);
  const to = clamp(targetIndex, targetArray.length);

  if (current.length) {
    current[from] = {
      ...current[from],
      listId: targetListId,
    };
    target.splice(to, 0, current.splice(from, 1)[0]);
  }

  return [...reindex(current), ...reindex(target)];
}
