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
        <div style={{flex: "0 0 420px"}}>
          {this.props.question}
        </div>
        <div style={{flex: "0 0 15px"}}>
          <img style={{width: "100%", height: "auto", marginTop: "-5px"}} src={this.state.isOpen?downArrow:rightArrow}/>
        </div>
      </div>
      <div style={{paddingLeft: "26px", color: "#666666"}}>
        <Collapse isOpen={this.state.isOpen}>
          {this.props.answer}
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
        <FAQQuestion number={1} question={"What is EZride?"} answer={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae leo ut dolor lobortis feugiat. Mauris sollicitudin nisi vitae consequat porta. Quisque aliquet metus nisi, ut molestie mi ultricies ut. Fusce venenatis libero vitae dolor pulvinar auctor. Duis auctor imperdiet nisi, ac pretium dolor maximus quis."}/>
        <FAQQuestion number={2} question={"How does it work?"} answer={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae leo ut dolor lobortis feugiat. Mauris sollicitudin nisi vitae consequat porta. Quisque aliquet metus nisi, ut molestie mi ultricies ut. Fusce venenatis libero vitae dolor pulvinar auctor. Duis auctor imperdiet nisi, ac pretium dolor maximus quis."}/>
        <FAQQuestion number={3} question={"How are payments made?"} answer={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae leo ut dolor lobortis feugiat. Mauris sollicitudin nisi vitae consequat porta. Quisque aliquet metus nisi, ut molestie mi ultricies ut. Fusce venenatis libero vitae dolor pulvinar auctor. Duis auctor imperdiet nisi, ac pretium dolor maximus quis."}/>
        <FAQQuestion number={4} question={"Is there a service fee for the platform?"} answer={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae leo ut dolor lobortis feugiat. Mauris sollicitudin nisi vitae consequat porta. Quisque aliquet metus nisi, ut molestie mi ultricies ut. Fusce venenatis libero vitae dolor pulvinar auctor. Duis auctor imperdiet nisi, ac pretium dolor maximus quis."}/>
        <FAQQuestion number={5} question={"Do I need to have an account to use it?"} answer={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae leo ut dolor lobortis feugiat. Mauris sollicitudin nisi vitae consequat porta. Quisque aliquet metus nisi, ut molestie mi ultricies ut. Fusce venenatis libero vitae dolor pulvinar auctor. Duis auctor imperdiet nisi, ac pretium dolor maximus quis."}/>
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
