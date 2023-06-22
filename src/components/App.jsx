import React, { Component } from 'react';
import './App.module.css';
import { Modal } from 'components/Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { handleFetch } from 'api/fetchFunction';

const INITIAL_STATE = {
  srclarge: '',
  alt: '',
};

export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
    isButton: null,
    error: null,
    srclarge: '',
    alt: '',
  };

  handlePagesAmount = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
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
      const response = await handleFetch(query, page);
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

  onClick = e => {
    const src = e.currentTarget.dataset.srclarge;
    const alt = e.currentTarget.getAttribute('alt');
    this.setState({
      srclarge: src,
      alt: alt,
    });
  };

  onExitClick = () => {
    this.setState({ ...INITIAL_STATE });
  };

  onExitEscape = e => {
    if (e.keyCode === 27) this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { images, page, isLoading, isButton, srclarge, alt } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} onClick={this.onClick} />
        )}
        {!isLoading && isButton > 12 && page < Math.ceil(isButton / 12) ? (
          <Button onClick={this.handlePagesAmount} />
        ) : null}
        {srclarge ? (
          <Modal
            src={srclarge}
            alt={alt}
            onExitClick={this.onExitClick}
            onExitEscape={this.onExitEscape}
          />
        ) : null}
      </>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.handleGet();
    }
  }
}
