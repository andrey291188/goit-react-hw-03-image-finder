import PropTypes from 'prop-types';
import css from '../styles.module.css';

export const ImageGalleryItem = ({ data, onClick }) => {

  return data.map(({ id, webformatURL, tags }, index) => (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItem_image}
        onClick={() => onClick(index)}
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
