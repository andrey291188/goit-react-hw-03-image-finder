import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { request } from 'components/Api/api';
import { Loader } from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from '../styles.module.css';

class ImageGallery extends Component {
  state = {
    dataApi: null,
    dataApiIndex: null,
    page: 1,
    loader: false,
    showModal: false,
    btnVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevTextRequest = prevProps.text;
    const nextTextRequest = this.props.text;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevTextRequest !== nextTextRequest) {
      this.setState({ page: 1 });
      this.setState({ loader: true });
      request(nextTextRequest, 1)
        .then(res => {
          if (!res.ok) {
            return Promise.reject(new Error());
          }
          return res.json();
        })
        .then(data => {
          if (!data.hits.length) {
            return alert(`Request with this name ${nextTextRequest} not found`);
          }
          this.setState({ dataApi: data.hits });
        })
        .catch(error => alert('Sorry something went wrong, try again'))
        .finally(() => this.setState({ loader: false, btnVisible: true }));
    } else if (prevPage !== nextPage && prevPage < nextPage) {
      this.setState({ loader: true, btnVisible: false });
      request(nextTextRequest, nextPage)
        .then(res => {
          if (!res.ok) {
            return Promise.reject(new Error());
          }
          return res.json();
        })
        .then(data => {
          if (!data.hits.length) {
            return alert('Sorry no more pictures');
          }
          this.setState(prevState => ({
            dataApi: [...prevState.dataApi, ...data.hits],
          }));
        })
        .catch(error => alert('Sorry something went wrong, try again'))
        .finally(() => this.setState({ loader: false, btnVisible: true }));
    }
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleDataIndex = index => {
    this.setState({ dataApiIndex: index });
    this.toggleModal();
  };

  render() {
    const { dataApi, loader, showModal, dataApiIndex, btnVisible } = this.state;
    return (
      <>
        {dataApi && (
          <>
            <ul className={css.ImageGallery}>
              <ImageGalleryItem data={dataApi} onClick={this.handleDataIndex} />
            </ul>
            {btnVisible && <Button onClick={this.handleIncrement} />}
          </>
        )}
        <Loader loader={loader} />
        {showModal && (
          <Modal
            imgModal={dataApi[dataApiIndex]}
            toggleModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  text: PropTypes.string.isRequired,
}
