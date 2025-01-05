import classes from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={classes["loader-container"]}>
      <div className={classes["loader-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
