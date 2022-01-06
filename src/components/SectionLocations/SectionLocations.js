import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.module.css';

import helsinkiImage from './images/location_helsinki.jpg';
import rovaniemiImage from './images/location_rovaniemi.jpg';
import rukaImage from './images/location_ruka.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
        <div className={css.linkText}>
          {nameText}
        </div>
      </div>
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Paros',
          helsinkiImage,
          '?address=Paros%2C%20South%20Aegean%2C%20Greece&bounds=37.13512%2C25.198458%2C36.96768%2C25.097698'
        )}
        {locationLink(
          'Santorini',
          rovaniemiImage,
          '?address=Santorini%2C%20Νήσος%20Σαντορίνη%2C%20Thira%2C%20South%20Aegean%20847%2000%2C%20Greece&bounds=36.5120665%2C25.52204868%2C36.3225553%2C25.34343807'
        )}
        {locationLink(
          'Crete',
          rukaImage,
          '?address=Crete%2C%20Greece&bounds=35.7764068975512%2C26.4520820779446%2C34.7186774013626%2C23.3745288060402'
        )}
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
