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
    arrayDataImage: [],
    dataImageIndex: null,
    page: 1,
    prePage: 12,
    loader: false,
    showModal: false,
    btnVisible: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page: nextPage, textSearch: nextTextRequest, prePage } = this.state;
    const { textSearch: prevTextRequest, page: prevPage } = prevState;
    
    try {
      if (prevTextRequest !== nextTextRequest || prevPage !== nextPage) {
        this.setState({ loader: true, btnVisible: false });
        const { data } = await request(nextTextRequest, nextPage, prePage);

        if (!data.hits.length) {
          alert(`Request with this name ${nextTextRequest} not found`);
          this.setState({ btnVisible: false, loader: false });
          return;
        } else if (data.totalHits < prePage) {
          this.setState({
            arrayDataImage: [...data.hits],
            btnVisible: false,
            loader: false,
          });
        } else if (!this.state.arrayDataImage.length) {
          this.setState({
            arrayDataImage: [...data.hits],
            btnVisible: true,
            loader: false,
          });
        } else {
          if (this.state.arrayDataImage.length + prePage >= data.totalHits) {
            this.setState({
              arrayDataImage: [...prevState.arrayDataImage, ...data.hits],
              btnVisible: false,
              loader: false,
            });
            return;
          }
          this.setState({
            arrayDataImage: [...prevState.arrayDataImage, ...data.hits],
            btnVisible: true,
            loader: false,
          });
        }
      }
    } catch (error) {
      alert('Sorry something went wrong, try again');
      this.setState({ loader: false });
    }
  }

  handleSearchSubmit = text => {
    this.setState({ textSearch: text, page: 1, arrayDataImage: [] });
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
    const { arrayDataImage, loader, showModal, dataImageIndex, btnVisible } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {arrayDataImage && (
          <ImageGallery data={arrayDataImage} onClick={this.handleDataIndex} />
        )}
        {btnVisible && <Button onClick={this.handleIncrement} />}
        {loader && <Loader />}
        {showModal && (
          <Modal
            imgModal={arrayDataImage[dataImageIndex]}
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
}