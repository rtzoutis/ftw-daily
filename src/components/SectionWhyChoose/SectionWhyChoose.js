import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionWhyChoose.module.css';

import availableAnywhere from './images/whychoose_availableanywhere.png';
import competitivePrices from './images/whychoose_competitiveprices.png';
import trustedProviders from './images/whychoose_trustedproviders.png';
import wideRange from './images/whychoose_widerange.png';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <div alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const SectionWhyChoose = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionWhyChoose.title" />
      </div>
      <div className={css.easyas}>
        <div className={css.img}>
          <img src={wideRange}/>
        </div>
        <div className={css.img}>
          <img src={competitivePrices}/>
        </div>
        <div className={css.img}>
          <img src={availableAnywhere}/>
        </div>
        <div className={css.img}>
          <img src={trustedProviders}/>
        </div>
      </div>
    </div>
  );
};

SectionWhyChoose.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionWhyChoose.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionWhyChoose;
