import githubIcon from "../../assets/github.png";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <p>
        Created by
        <span className={classes["developer-link"]}>
          <a href="https://github.com/juliabgkv" target="_blank">
            juliabgkv
            <img src={githubIcon} alt="Github" />
          </a>
        </span>
      </p>
      <p>
        Powered by
        <a href="https://openweathermap.org/" target="_blank">
          OpenWeather API
        </a>
      </p>
      <p>
        Icons from
        <a href="https://www.flaticon.com" target="_blank">
          flaticon.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;
