import PropTypes from 'prop-types';
import css from '../styles.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  onClick,
  index,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItem_image}
        onClick={() => onClick(index)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
