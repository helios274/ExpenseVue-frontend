import { MdOutlineLightMode, MdLightMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice";

const ThemeToggler = () => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    // if (themeMode == "light") dispatch(toggleDarkTheme());
    // else dispatch(toggleLightTheme());
    if (themeMode == "light") dispatch(toggleTheme({ themeMode: "dark" }));
    else dispatch(toggleTheme({ themeMode: "light" }));
  };

  return (
    <button className="theme-toggler" onClick={handleToggle}>
      <MdOutlineLightMode />
    </button>
  );
};

export default ThemeToggler;
