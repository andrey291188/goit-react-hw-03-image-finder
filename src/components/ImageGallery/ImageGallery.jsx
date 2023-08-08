import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from '../styles.module.css';

const ImageGallery = ({data, onClick}) => {
 
    return (
            <ul className={css.ImageGallery}>
              <ImageGalleryItem data={data} onClick={onClick} />
            </ul>
    );
  
}

export default ImageGallery;

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}
