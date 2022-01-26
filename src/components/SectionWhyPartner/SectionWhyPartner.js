import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionWhyPartner.module.css';

import whyPartner from './images/whypartner.png';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <div alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const SectionWhyPartner = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionWhyPartner.title" />
      </div>
      <div className={css.whypartner}>
        <div className={css.img}>
          <img src={whyPartner}/>
        </div>
        <div className={css.text}>
          <p style={{marginTop: "0px"}}>
            EZRide can take your rental business online, and share your listings with customers globally!
          </p>
          <p>
            Regardless of your company size or location, you instantly join one of the world’s biggest rental booking marketplaces and reach <b>our large international audience of travellers!</b>
          </p>
          <p>
           <b>EZRide is really easy!</b> You just need to create your FREE account, enter your information, and we will add you and your services to our marketplace!
          </p>
          <p>
            Walk-in bookings are unpredictable, while our customers are making online bookings in advance, which helps your cash flow, and your availability planning.
          </p>
          <p>
            Do what you know best - run the rental business and let us take care of online advertisement and bookings, which is what we’re good at. Even if you are already online, we can bring you additional business and be a new channel to international customers.
          </p>
          <p>
            In EZRide, we build a relationship of Trust and Transparency with our partners and achieve a winning business model.
          </p>
          <p>
            <b>Join Us!</b>
          </p>
        </div>
      </div>
    </div>
  );
};

SectionWhyPartner.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionWhyPartner.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionWhyPartner;
