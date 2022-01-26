import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';

import css from './FAQ.module.css';

import rightArrow from './images/right_arrow.png';
import downArrow from './images/down_arrow.png';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <div alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

class FAQQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false 
    };
  }

  render() {
    return <div>
      <div className={css.question} onClick={() => this.setState({isOpen: !this.state.isOpen})}>
        <div style={{flex: "0 0 25px"}}>
          {this.props.number}.
        </div>
        <div className={css.questionText}>
          {this.props.question}
        </div>
        <div style={{flex: "0 0 15px"}}>
          <img style={{width: "100%", height: "auto", marginTop: "-5px"}} src={this.state.isOpen?downArrow:rightArrow}/>
        </div>
      </div>
      <div style={{paddingLeft: "26px", color: "#666666"}}>
        <Collapse isOpen={this.state.isOpen}>
          <span dangerouslySetInnerHTML={{ __html: this.props.answer }}></span>
        </Collapse>
      </div>
    </div>;
  }
}

const FAQ = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="FAQ.title" />
      </div>
      <div style={{marginTop: "25px"}}>
        <FAQQuestion number={1} question={"Why is EZRide better for me?"} answer={"We guarantee the best available prices. This means that you will not find a better price even at the office of the rental company. Moreover, you can secure the availability of your desire ride by booking in advance."}/>
        <FAQQuestion number={2} question={"How much does EZRide services cost?"} answer={"<b>EZRide is Free for our customers!</b> You don’t pay any commission for our services: our services are free for customers, and there are no credit card fees. We have special agreements with all of the rental companies listed, and they pay us. As the customer, the price for you is always the same or lower as if you were renting on arrival."}/>
        <FAQQuestion number={3} question={"Do I need to have an account to use EZRide?"} answer={"Yes! You need to create an account to use EZRide. But don’t worry, our registration is easy, fast, and reliable!"}/>
        <FAQQuestion number={4} question={"How are payments made?"} answer={"You don’t need to pay the full price at the moment of booking. We charge only a small part of the total price on behalf of the rental company just to secure your booking. This means that you pay part of the total price now and the rest when you pick up your vehicle."}/>
        <FAQQuestion number={5} question={"Can I cancel my booking?"} answer={"Of course! Plans change sometimes, and you can always cancel or modify your reservation. Cancellation at no extra cost is possible at any time more than 48 hours before the start of the rental period. After 48 hours full rental price will be charged. Please note that the part which you paid online to secure your booking is not refundable."}/>
      </div>
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
