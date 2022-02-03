import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import { useFormState } from 'react-final-form';

import css from './EditListingDescriptionForm.module.css';

function CustomSubcategorySelectFieldMaybe(props){
  const formState = useFormState();
  const { name, id, subcategories, category_field, intl } = props;
  const categoryLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.categoryLabel',
  });
  const categoryPlaceholder = intl.formatMessage({
    id: 'EditListingDescriptionForm.categoryPlaceholder',
  });
  const categoryRequired = required(
    intl.formatMessage({
      id: 'EditListingDescriptionForm.categoryRequired',
    })
  );
  return subcategories ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={categoryLabel}
      validate={categoryRequired}
    >
      <option disabled value="">
        {categoryPlaceholder}
      </option>
      {subcategories.map(c => (
        c.category == formState.values[category_field] && <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomSubcategorySelectFieldMaybe;
