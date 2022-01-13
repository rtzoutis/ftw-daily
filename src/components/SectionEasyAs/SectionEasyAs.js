import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionEasyAs.module.css';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <div alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const SectionEasyAs = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionEasyAs.title" />
      </div>
      <div className={css.easyas}>
        <div className={css.img}>
          <div className={css.select}></div>
        </div>
        <div className={css.img}>
          <div className={css.confirm}></div>
        </div>
        <div className={css.img}>
          <div className={css.ride}></div>
        </div>
      </div>
    </div>
  );
};

SectionEasyAs.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionEasyAs.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionEasyAs;
