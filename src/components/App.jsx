import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './styles.module.css';

class App extends Component {
  state = {
    textSearch: '',
  };

  handleSearchSubmit = text => {
    this.setState({ textSearch: text });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery text={this.state.textSearch}/>
      </div>
    );
  }
}

export default App;


