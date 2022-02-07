import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditListingGeneralForm.module.css';

const CustomColorSelectField = props => {
  const { name, id, colors, intl } = props;
  const colorLabel = intl.formatMessage({
    id: 'EditListingGeneralForm.colorLabel',
  });
  const colorPlaceholder = intl.formatMessage({
    id: 'EditListingGeneralForm.colorPlaceholder',
  });
  const colorRequired = required(
    intl.formatMessage({
      id: 'EditListingGeneralForm.colorRequired',
    })
  );
  return colors ? (
    <FieldSelect
      className={css.color}
      name={name}
      id={id}
      label={colorLabel}
      validate={colorRequired}
    >
      <option disabled value="">
        {colorPlaceholder}
      </option>
      {colors.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomColorSelectField;
