import React from 'react';
import css from "./ImgaeGalleryItem.module.css";

export const ImageGalleryItem = () => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItem-image} src="" alt="" />
    </li>
  );
};
