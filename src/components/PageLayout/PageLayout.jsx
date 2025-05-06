import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

function PageLayout({ children }) {
  return (
    <div className={styles.component}>
      {children}
    </div>
  );
}

export default PageLayout;

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
