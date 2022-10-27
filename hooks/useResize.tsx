import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGameSizes } from "Redux/slices/viewSlice";

export const useResize = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      const windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      dispatch(setGameSizes(windowSize));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
};
