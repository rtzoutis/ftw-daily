import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '..';
import { EditListingGeneralForm } from '../../forms';
import config from '../../config';

import css from './EditListingGeneralPanel.module.css';

const EditListingGeneralPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingGeneralPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingGeneralPanel.createListingTitle" />
  );

  const colorOptions = findOptionsForSelectFilter('color', config.custom.filters);

  const types = publicData && publicData.types;
  const subcategory = publicData && publicData.subcategory;
  const reference_link = publicData && publicData.reference_link;
  const quantity = publicData && publicData.quantity;
  const color = publicData && publicData.color;
  const initialValues = { types, subcategory, reference_link, quantity, color };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingGeneralForm
        className={css.form}
        name={'types'}
        initialValues={initialValues}
        onSubmit={values => {
          const { types = [], reference_link, quantity, color } = values;

          const updatedValues = {
            publicData: { types, reference_link, quantity, color },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        colors={colorOptions}
        fetchErrors={errors}
      />
    </div>
  );
};

EditListingGeneralPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingGeneralPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingGeneralPanel;
