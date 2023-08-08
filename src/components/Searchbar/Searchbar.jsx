import { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';

class Searchbar extends Component {
  state = {
    textSearchForm: '',
  };

  handleTextSearchChange = e => {
    this.setState({ textSearchForm: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.textSearchForm.trim() === ""){
      return alert("Enter your request")
    }
    this.props.onSubmit(this.state.textSearchForm);
    this.setState({ textSearchForm: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleTextSearchChange}
            value={this.state.textSearchForm}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}