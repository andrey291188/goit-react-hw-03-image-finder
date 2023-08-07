import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { request } from 'components/Api/api';
import { Loader } from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
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
        .then(res => res.json())
        .then(data => this.setState({ dataApi: data.hits }))
        .finally(() => this.setState({ loader: false, btnVisible: true }));
    } else if (prevPage !== nextPage && prevPage < nextPage) {
      this.setState({ loader: true, btnVisible: false });
      request(nextTextRequest, nextPage)
        .then(res => res.json())
        .then(data =>
          this.setState(prevState => ({
            dataApi: [...prevState.dataApi, ...data.hits],
          }))
        )
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
        <Loader loader={loader}/>
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
