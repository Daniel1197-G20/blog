export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Placeholder hook to be implemented in a subsequent stage
  const setValue = (_value: T) => {};
  return [initialValue, setValue];
}
