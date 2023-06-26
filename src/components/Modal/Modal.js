import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ src, alt, onExitClick, onExitEscape }) => {
  useEffect(() => {
    document.addEventListener('keyup', onExitEscape);
    return () => {
      document.removeEventListener('keyup', onExitEscape);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={css.Overlay} onClick={onExitClick}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onExitClick: PropTypes.func,
  onExitEscape: PropTypes.func,
};
