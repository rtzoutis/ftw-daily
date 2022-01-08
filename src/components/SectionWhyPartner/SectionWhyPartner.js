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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus, magna ultrices lacinia lobortis, justo mi iaculis orci, vitae suscipit nunc massa ut nibh. Suspendisse lacinia dolor nec nisl interdum fermentum. Donec elementum vitae velit dignissim mattis. Proin tempor, mauris ac molestie porta, massa nisl sollicitudin nisi, id ornare tortor magna quis nibh. Aenean commodo erat nec volutpat porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae nulla id odio dignissim mollis ut nec dui.
          </p>
          <p>
            Sed ut quam leo. Maecenas dictum ultrices dolor egestas convallis. Maecenas consectetur purus mi, ut fermentum ligula dignissim ut. Donec fringilla fringilla ex tincidunt consequat. Nullam sed nibh eget odio varius porta. Sed quis neque ut sapien vestibulum lacinia a et orci. Pellentesque rhoncus mollis quam, vel sollicitudin est condimentum vel. Nunc eget mollis arcu. Nulla vulputate eget tortor quis molestie. Ut metus sem, placerat nec erat non, ornare egestas metus. Integer sit amet venenatis lacus, vitae sodales ligula. Donec id est id ipsum vulputate dictum sed non diam. Praesent eu scelerisque nibh.
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
