import { useScrollContext } from './ScrollProvider';

export function useActiveSection() {
  const { currentId } = useScrollContext();
  return currentId;
}
