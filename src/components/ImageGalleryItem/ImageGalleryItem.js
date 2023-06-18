import React, { Component } from 'react';
import css from './ImgaeGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  srclarge: '',
  alt: '',
};

export class ImageGalleryItem extends Component {
  state = { ...INITIAL_STATE };

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

  componentDidMount() {
    document.addEventListener('keyup', this.onExitEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onExitEscape);
  }

  render() {
    const { src, alt, srcLarge } = this.props;
    const { srclarge } = this.state;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItemImage}
            src={src}
            alt={alt}
            data-srclarge={srcLarge}
            onClick={this.onClick}
          />
        </li>
        {srclarge ? (
          <Modal
            src={this.state.srclarge}
            alt={this.state.alt}
            onClick={this.onExitClick}
            onEscape={this.onExitEscape}
          />
        ) : null}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  srcLarge: PropTypes.string,
};
