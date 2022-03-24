import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import Dashboard from './components/Dashboard';
import { ThemeContext, ThemeContextType, themes } from './theme/ThemeContext';
import Switch from "react-switch";

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const { changeTheme } = React.useContext(ThemeContext) as ThemeContextType;

  const handleChangeTheme = (checked:boolean) => {
    setDarkMode(!darkMode);
    setChecked(checked);
    changeTheme(darkMode ? themes.light : themes.dark);
  }

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
            {() => (
              <Switch 
                onChange={handleChangeTheme}
                checked={checked}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={"#F2F4F4"}
                className="react-switch"
              >
              </Switch>
            )}
          </ThemeContext.Consumer>
      <Dashboard></Dashboard>
    </React.Fragment>
  );
}

export default App;
