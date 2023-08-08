import { CirclesWithBar } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import css from '../styles.module.css';

export const Loader = ({ loader }) => {
  return (
    <div className={css.loader}>
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={loader}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};

Loader.propTypes = {
  loader: PropTypes.bool.isRequired,
}