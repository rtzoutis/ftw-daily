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

import css from './FieldSeasonGroup.module.css';
import FieldTextInput from '../FieldTextInput/FieldTextInput';
import FieldSeasonInput from './FieldSeasonInput';

import * as validators from '../../util/validators';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';

const FieldSeasonRenderer = props => {
  const { className, rootClassName, label, twoColumns, id, name, meta, header, title, validate, intl } = props;
  const formState = useFormState();

  const classes = classNames(rootClassName || css.root, className);
  const listClasses = twoColumns ? classNames(css.list, css.twoColumns) : css.list;

  const seasonPeriodValid = validators.seasonPeriodValid(intl.formatMessage({
    id: 'ProfileSettingsForm.seasonPeriodValid',
  }));

  let result = [];
  for(let i = 0; i<3; i++){
    if(i == 0 || (formState.values[`${title}_start_${i}`] && formState.values[`${title}_end_${i}`])){
        result.push(
            <li key={`${id}.${i}`} className={css.item}>
              <div style={{paddingTop: "8px", flex: "0 0 125px"}}>
                {i == 0 && header}
              </div>
              <FieldSeasonInput
                type="text"
                id={`${title}_start_${i+1}`}
                name={`${title}_start_${i+1}`}
                placeholder={"From (DD/MM)"}
                validate={seasonPeriodValid}
                onKeyPress={(event) => {
                  if (!/[0-9\/]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FieldSeasonInput
                type="text"
                id={`${title}_end_${i+1}`}
                name={`${title}_end_${i+1}`}
                placeholder={"To (DD/MM)"}
                validate={seasonPeriodValid}
                onKeyPress={(event) => {
                  if (!/[0-9\/]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
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

FieldSeasonRenderer.defaultProps = {
  rootClassName: null,
  className: null,
  label: null,
  twoColumns: false,
  name: "",
  title: "",
  header: "",
};

FieldSeasonRenderer.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label: node,
  name: string.isRequired,
  title: string.isRequired,
  header: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
  twoColumns: bool,
  intl: intlShape.isRequired,
};

const FieldSeasonGroup = props => <FieldArray component={FieldSeasonRenderer} {...props} />;

// Name and component are required fields for FieldArray.
// Component-prop we define in this file, name needs to be passed in
FieldSeasonGroup.propTypes = {
  name: string.isRequired,
};

export default compose(injectIntl)(FieldSeasonGroup);
