import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDefaultThemeMode } from "Redux/slices/viewSlice";

export const useDefaultDarkMode = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isDefaultDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    dispatch(setDefaultThemeMode(isDefaultDark));
  }, []);
};
