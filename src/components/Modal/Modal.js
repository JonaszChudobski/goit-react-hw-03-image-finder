import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ src, alt, onClick }) => {
  return (
    <div className={css.Overlay} onClick={onClick}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};
