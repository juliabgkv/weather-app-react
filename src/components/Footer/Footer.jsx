import githubIcon from "../../assets/github.png";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <p>
        Powered by
        <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">
          OpenWeather API
        </a>
      </p>
      <p>
        Created by
        <span className={classes["developer-link"]}>
          <a href="https://github.com/juliabgkv" target="_blank" rel="noreferrer">
            juliabgkv
            <img src={githubIcon} alt="Github" />
          </a>
        </span>
      </p>
    </footer>
  );
}

export default Footer;
