import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldCheckboxGroup } from '../../components';
import config from '../../config';

import CustomColorSelectField from './CustomColorSelectField';

import css from './EditListingGeneralForm.module.css';
import FieldCheckboxGroupSubcategory from '../../components/FieldCheckboxGroup/FieldCheckboxGroupSubcategory';

const TITLE_MAX_LENGTH = 60;

const EditListingGeneralFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        disabled,
        ready,
        rootClassName,
        className,
        name,
        intl,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
        colors,
      } = formRenderProps;

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingGeneralForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingGeneralForm.showListingFailed" />
        </p>
      ) : null;

      const typesLabel = intl.formatMessage({
        id: 'EditListingGeneralForm.types',
      });

      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingGeneralForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      });

      const options = findOptionsForSelectFilter('types', filterConfig);
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          {typesLabel ? <label htmlFor={name}>{typesLabel}</label> : null}
          <FieldCheckboxGroupSubcategory subcategory_name={'subcategory'} className={css.types} id={name} name={name} options={options} />

          <FieldTextInput
            id="reference_link"
            name="reference_link"
            className={css.reference_link}
            type="text"
            label={ intl.formatMessage({id: 'EditListingGeneralForm.reference_link'}) }
            placeholder={ intl.formatMessage({id: 'EditListingGeneralForm.reference_linkPlaceholder'}) }
          />

          <FieldTextInput
            id="listing_code"
            name="listing_code"
            className={css.listing_code}
            type="text"
            label={ intl.formatMessage({id: 'EditListingGeneralForm.listing_code'}) }
            placeholder={ intl.formatMessage({id: 'EditListingGeneralForm.listing_codePlaceholder'}) }
            validate={composeValidators(required( intl.formatMessage({id: 'EditListingGeneralForm.listing_codeRequired'}) ), maxLength60Message)}
          />

          <CustomColorSelectField
            id="color"
            name="color"
            colors={colors}
            intl={intl}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingGeneralFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingGeneralFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
  colors: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};


export default compose(injectIntl)(EditListingGeneralFormComponent);
