import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?q=cat&page=1&key=37378265-e99df069f710b566c70c02ed7&image_type=photo&orientation=horizontal&per_page=12';

export class App extends Component {
  state = {
    images: [],
  };
  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar />
        {images.length > 0 ? <ImageGallery images={images} /> : null}
      </>
    );
  }
}
