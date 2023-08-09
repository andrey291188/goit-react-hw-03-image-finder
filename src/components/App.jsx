import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import request from '../service/Api/api';
import PropTypes from 'prop-types';
import css from './styles.module.css';

class App extends Component {
  state = {
    textSearch: '',
    arrayDataImages: [],
    dataImageIndex: null,
    page: 1,
    loader: false,
    showModal: false,
    btnVisible: null,
  };

  componentDidUpdate(_, prevState) {
    const { page: nextPage, textSearch: nextTextRequest } = this.state;
    const { textSearch: prevTextRequest, page: prevPage } = prevState;
    if (prevTextRequest !== nextTextRequest || prevPage !== nextPage) {
      this.getRequest(nextTextRequest, nextPage);
    }
  }

  getRequest = async (queryText, page) => {
    try {
      this.setState({ loader: true });
      const response = await request(queryText, page);
      if (!response.hits.length) {
        return alert(`Request with this name ${queryText} not found`);
      }
      this.setState(prevState => ({
        arrayDataImages: [...prevState.arrayDataImages, ...response.hits],
        btnVisible: response.totalHits,
      }));
    } catch (error) {
      alert('Sorry something went wrong, try again');
    } finally {
      this.setState({ loader: false });
    }
  };

  handleSearchSubmit = text => {
    this.setState({ textSearch: text, page: 1, arrayDataImages: [] });
  };

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
    this.setState({ dataImageIndex: index });
    this.toggleModal();
  };

  render() {
    const { arrayDataImages, loader, showModal, dataImageIndex, btnVisible } =
      this.state;
    const totalPage = btnVisible / arrayDataImages.length;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {arrayDataImages && (
          <ImageGallery data={arrayDataImages} onClick={this.handleDataIndex} />
        )}
        {totalPage > 1 && !loader && arrayDataImages.length > 0 && (
          <Button onClick={this.handleIncrement} />
        )}
        {loader && <Loader />}
        {showModal && (
          <Modal
            imgModal={arrayDataImages[dataImageIndex]}
            toggleModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;

App.propTypes = {
  text: PropTypes.string,
};
