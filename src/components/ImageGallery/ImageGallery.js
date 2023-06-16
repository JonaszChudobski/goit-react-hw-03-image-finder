import React from 'react';
import css from "./ImageGallery.module.css";
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return <ul className={css.ImageGallery}>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem id={id} src={webformatURL} />
    ))}
  </ul>;
};
