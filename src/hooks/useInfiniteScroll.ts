import { type MutableRefObject, useEffect, useState } from 'react';

interface ScrollOptions {
  direction: 'down' | 'up';
}

interface Props {
  callback: VoidFunction;
  ref: MutableRefObject<HTMLElement | null>;
  scrollOptions?: ScrollOptions;
}

function useInfiniteScroll({ callback, ref, scrollOptions = { direction: 'down' } }: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { direction } = scrollOptions;
  useEffect(() => {
    const element = ref?.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  });

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function handleScroll() {
    if (ref?.current != null) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;

      switch (direction) {
        case 'up':
          if (scrollTop === 10) {
            setIsFetching(true);
          } else {
            setIsFetching(false);
          }
          break;
        case 'down':
          if (scrollTop + clientHeight + 10 >= scrollHeight) {
            setIsFetching(true);
          } else {
            setIsFetching(false);
          }
          break;
        default:
          break;
      }
    }
  }

  return { isFetching, setIsFetching };
}

export default useInfiniteScroll;
