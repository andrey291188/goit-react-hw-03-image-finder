import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from '../styles.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);

  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  backdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    const { imgModal } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.backdropClick}>
        <div className={css.Modal}>
          <img src={imgModal.largeImageURL} alt={imgModal.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
