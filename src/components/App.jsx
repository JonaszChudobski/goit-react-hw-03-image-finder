import React, { Component, Fragment } from 'react';
import './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import axios from 'axios';
import { Button } from './Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
    isButton: null,
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements[1].value;
    this.setState({
      query: input,
      page: 1,
      isButton: null,
    });
  };

  handleGet = async () => {
    this.setState({ isLoading: true });
    const { query, page } = this.state;
    try {
      const response = await axios.get(
        `/?q=${query}&page=${page}&key=37378265-e99df069f710b566c70c02ed7&image_type=photo&orientation=horizontal&per_page=12`
      );
      if (page === 1) {
        this.setState({
          images: response.data.hits,
          isButton: response.data.totalHits,
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
        }));
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlePagesAmount = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, page, isLoading, isButton } = this.state;
    return (
      <Fragment>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading ? <Loader /> : <ImageGallery images={images} />}
        {!isLoading && isButton > 12 && page < Math.ceil(isButton / 12) ? (
          <Button onClick={this.handlePagesAmount} />
        ) : null}
      </Fragment>
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      await this.handleGet();
    }
  }
}
