export default function FindLastSpot(strings: (string | null)[]): number {
  for (let i: number = strings.length - 1; i >= 0; i--) {
    if (strings[i] == null) {
      return i;
    }
  }
  return -1;
}
