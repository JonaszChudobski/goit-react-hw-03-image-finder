import React from 'react';
import css from './ImgaeGalleryItem.module.css';

export const ImageGalleryItem = ({ id, src, alt }) => {
  return (
    <li key={id} className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImage} src={src} alt={alt} />
    </li>
  );
};
