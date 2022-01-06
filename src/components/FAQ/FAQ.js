import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

//import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';

import css from './FAQ.module.css';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <div alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const FAQ = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="FAQ.title" />
      </div>
      {/*<Collapse isOpen={true}>
        Test
  </Collapse>*/}
    </div>
  );
};

FAQ.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

FAQ.propTypes = {
  rootClassName: string,
  className: string,
};

export default FAQ;
