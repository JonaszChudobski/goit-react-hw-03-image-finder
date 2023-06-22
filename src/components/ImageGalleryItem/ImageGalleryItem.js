import React from 'react';
import css from './ImgaeGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, srcLarge, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={src}
        alt={alt}
        data-srclarge={srcLarge}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  srcLarge: PropTypes.string,
  onClick: PropTypes.func,
};
