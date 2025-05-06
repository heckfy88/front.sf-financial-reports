import React from "react";
import cs from "classnames";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

function Button({ children, disabled, type="button", title, className, onClick }) {
  return (
    <button type={type} className={cs(styles.component, className)} disabled={disabled} onClick={onClick}>
      {title || children}
    </button>
  );
}

export default Button;


Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};
