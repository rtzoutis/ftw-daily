/*
 * Renders a group of checkboxes that can be used to select
 * multiple values from a set of options.
 *
 * The corresponding component when rendering the selected
 * values is PropertyGroup.
 *
 */

import React, { useState } from 'react';
import { arrayOf, bool, node, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FieldArray } from 'react-final-form-arrays';
import { FieldCheckbox, ValidationError } from '../../components';
import { useFormState } from 'react-final-form';

import css from './FieldDiscountGroup.module.css';
import FieldTextInput from '../FieldTextInput/FieldTextInput';

import * as validators from '../../util/validators';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';

const FieldDiscountRenderer = props => {
  const { className, rootClassName, label, twoColumns, id, name, meta, intl } = props;
  const formState = useFormState();

  const classes = classNames(rootClassName || css.root, className);
  const listClasses = twoColumns ? classNames(css.list, css.twoColumns) : css.list;

  const packageDiscountValid = validators.packageDiscountValid(intl.formatMessage({
    id: 'ProfileSettingsForm.packageDiscountValid',
  }));

  let result = [];
  for(let i = 0; i<10; i++){
    if(i == 0 || (formState.values[`discount_days_${i}`] && formState.values[`discount_percentages_${i}`])){
        result.push(
            <li key={`${id}.${i}`} className={css.item}>
                <FieldTextInput
                    type="text"
                    id={`discount_days_${i+1}`}
                    name={`discount_days_${i+1}`}
                    placeholder={"i.e. 2-4 or 5 or >5"}
                    validate={packageDiscountValid}
                    onKeyPress={(event) => {
                      if (!/[0-9\-\>]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                />
                <div style={{paddingTop: "8px", flex: "0 0 50px"}}>
                    days
                </div>
                <FieldTextInput
                    type="text"
                    id={`discount_percentages_${i+1}`}
                    name={`discount_percentages_${i+1}`}
                    placeholder={"i.e. 10"}
                    validate={packageDiscountValid}
                    onKeyPress={(event) => {
                      if (!/[0-9\-\>]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                />
                <div style={{paddingTop: "8px", flex: "0 0 20px"}}>
                    %
                </div>
            </li>
        );
    }
  }
  
  return (
    <fieldset className={classes}>
      {label ? <legend>{label}</legend> : null}
      <ul className={listClasses}>
        {result}
      </ul>
      <ValidationError fieldMeta={{ ...meta }} />
    </fieldset>
  );
};

FieldDiscountRenderer.defaultProps = {
  rootClassName: null,
  className: null,
  label: null,
  twoColumns: false,
  name: "",
};

FieldDiscountRenderer.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label: node,
  name: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
  twoColumns: bool,
  intl: intlShape.isRequired,
};

const FieldDiscountGroup = props => <FieldArray component={FieldDiscountRenderer} {...props} />;

// Name and component are required fields for FieldArray.
// Component-prop we define in this file, name needs to be passed in
FieldDiscountGroup.propTypes = {
  name: string.isRequired,
};

export default compose(injectIntl)(FieldDiscountGroup);
