import React, { useMemo } from "react";
import cs from "classnames";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

function Header({ big, small, xs, title, center, className }) {
  const HeaderTagName = useMemo(() => {
    if (big) {
      return "h1";
    }

    if (small) {
      return "h3";
    }

    if (xs) {
      return "h4";
    }

    return "h2";
  }, [big, small, xs]);

  const classes = {
    [styles.component]: true,
    [styles[(big && "h1") || (small && "h3") || (xs && "h4") || "h2"]]: true,
    [styles.center]: center,
  };

  return (
    <div className={cs(classes, className)}>
      <HeaderTagName className={styles.title}>{title}</HeaderTagName>
    </div>
  );
}

export default Header;

Header.propTypes = {
  big: PropTypes.bool,
  small: PropTypes.bool,
  xs: PropTypes.bool,
  title: PropTypes.string,
  center: PropTypes.bool,
  className: PropTypes.string,
};
