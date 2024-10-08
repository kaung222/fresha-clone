import { useEffect, RefObject } from "react";

const useOuterClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  callBack: (event: MouseEvent) => void
) => {
  useEffect(() => {
    function handleOutOfSpaceAction(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callBack(event);
      }
    }
    document.addEventListener("mousedown", handleOutOfSpaceAction);

    return () => {
      document.removeEventListener("mousedown", handleOutOfSpaceAction);
    };
  }, [ref, callBack]);
};

export default useOuterClick;
