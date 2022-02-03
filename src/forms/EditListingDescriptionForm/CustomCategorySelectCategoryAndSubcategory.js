import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import { useFormState } from 'react-final-form';

import css from './EditListingDescriptionForm.module.css';

function CustomCategorySelectCategoryAndSubcategory(props) {
  const { names, ids, data, intl } = props;
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

  let result = [];
  
  const formState = useFormState();
  console.log(formState.values);
  for(let i = 0; i<ids.length; i++){
    result.push(
        <FieldSelect
            className={css.category}
            name={names[i]}
            id={ids[i]}
            label={formState.values["category"]}
            validate={categoryRequired}
        >
            <option disabled value="">
                {categoryPlaceholder}
            </option>
            {data[i].map(c => (
                <option key={c.key} value={c.key}>
                    {c.label}
                </option>
            ))}
        </FieldSelect>
    );
  }
  return result;
};

export default CustomCategorySelectCategoryAndSubcategory;
