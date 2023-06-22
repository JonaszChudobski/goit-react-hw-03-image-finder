import { Component } from 'react';
import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  state = {
    src: this.props.src,
    alt: this.props.alt,
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.props.onExitClick}>
        <div className={css.Modal}>
          <img src={this.state.src} alt={this.state.alt} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('keyup', this.props.onExitEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.props.onExitEscape);
  }
}
Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onExitClick: PropTypes.func,
  onExitEscape: PropTypes.func,
};
