import { useUnit } from "../../store/UnitContext";
import classes from "../UnitToggler/UnitToggler.module.css";

function UnitToggler() {
  const { unit, toggleUnit } = useUnit();

  return (
    <div
      className={`${classes["toggle-container"]} ${
        unit === "metric" ? classes["metric"] : classes["imperial"]
      }`}
      onClick={toggleUnit}
    >
      <span className={classes["metric-label"]}>Metric: °C, m/s</span>
      <span className={classes["imperial-label"]}>Imperial: °F, mph</span>
      <div className={classes["toggle-indicator"]}></div>
    </div>
  );
}

export default UnitToggler;
