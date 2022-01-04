import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLookingFor.module.css';

import vehiclesImage from './images/vehicles.jpg';
import bicyclesImage from './images/bicycles.jpg';
import motorbikesImage from './images/motorbikes.jpg';
import quadbikesImage from './images/quadbikes.jpg';
import ribsImage from './images/ribs.jpg';
import sailboatsImage from './images/sailboats.jpg';
import watersportsImage from './images/watersports.jpg';
import waterfunImage from './images/waterfun.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <div alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 70%, rgba(34, 62, 84, 0.8) 80%, rgba(34, 62, 84, 1) 100%), url('+image+')', backgroundSize: 'cover', backgroundPosition: 'center center'}} alt={name} className={css.locationImage} />
        </div>
        <div className={css.linkText}>
          {nameText}
        </div>
      </div>
    </NamedLink>
  );
};

const SectionLookingFor = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLookingFor.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Vehicles',
          vehiclesImage,
          '?address=Helsinki%2C%20Finland&bounds=60.2978389%2C25.254484899999966%2C59.9224887%2C24.782875800000056&origin=60.16985569999999%2C24.93837910000002'
        )}
        {locationLink(
          'Bicycles',
          bicyclesImage,
          '?address=Rovaniemi%2C%20Finland&bounds=67.18452510000002%2C27.32667850000007%2C66.1553745%2C24.736871199999996&origin=66.50394779999999%2C25.729390599999988'
        )}
        {locationLink(
          'Motor Bikes',
          motorbikesImage,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
        {locationLink(
          'Quad Bikes',
          quadbikesImage,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
        {locationLink(
          'Ribs',
          ribsImage,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
        {locationLink(
          'Sailboats',
          sailboatsImage,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
        {locationLink(
          'Water Sports',
          watersportsImage,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
        {locationLink(
          'Water Fun',
          waterfunImage,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
      </div>
      <div style={{width: "100%", textAlign: "center"}}>
        <NamedLink name="SearchPage" to={{ search: "?test" }} className={css.seeAll}>
          See All
        </NamedLink>
      </div>
    </div>
  );
};

SectionLookingFor.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLookingFor.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLookingFor;
