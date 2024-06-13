import githubIcon from "../../assets/github.png";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <p>
        Created by
        <a href="https://github.com/juliabgkv" target="_blank">
          <img src={githubIcon} alt="Github" />
          juliabgkv
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
