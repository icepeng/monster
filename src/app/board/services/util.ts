function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}

export function moveItemIndex<T extends Record<string, any>>(
  array: T[],
  indexName: string,
  fromIndex: number,
  toIndex: number
): T[] {
  const arr = [...array];
  const from = clamp(fromIndex, array.length - 1);
  const to = clamp(toIndex, array.length - 1);

  if (from === to) {
    return arr;
  }

  const target = arr[from];
  const delta = to < from ? -1 : 1;

  for (let i = from; i !== to; i += delta) {
    arr[i] = {
      ...arr[i],
      [indexName]: arr[i + delta][indexName],
    };
  }

  arr[to] = {
    ...arr[to],
    [indexName]: target[indexName],
  };

  return arr;
}
