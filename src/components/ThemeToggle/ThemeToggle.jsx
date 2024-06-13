import classes from "./ThemeToggle.module.css";

function ThemeToggle({ isDark, onToggleTheme }) {
  return (
    <div className={classes["toggle-container"]}>
      <input
        type="checkbox"
        id="themeToggler"
        className={classes.toggle}
        onChange={onToggleTheme}
        checked={isDark}
      />
      <label htmlFor="themeToggler">Dark Mode</label>
    </div>
  );
}

export default ThemeToggle;
