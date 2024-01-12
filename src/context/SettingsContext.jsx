import { createContext, useContext, useState } from "react";

export const SettingsContext = createContext({
  themeMode: "light",
  onToggleMode: () => {},
});

const SettingsProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const onToggleMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return (
    <SettingsContext.Provider value={{ themeMode, onToggleMode }}>
      {" "}
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};

export default SettingsProvider;
