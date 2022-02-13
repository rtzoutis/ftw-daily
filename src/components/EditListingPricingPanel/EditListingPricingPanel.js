import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';

import { propTypes } from '../../util/types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendVerificationEmail, hasCurrentUserErrors } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling } from '../../ducks/UI.duck';

import css from './EditListingPricingPanel.module.css';

const { Money } = sdkTypes;

const EditListingPricingPanelComponent = props => {
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
    currentUser,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );

  const lowSeasonsStart = [];
  const lowSeasonsEnd = [];
  const midSeasonsStart = [];
  const midSeasonsEnd = [];
  const highSeasonsStart = [];
  const highSeasonsEnd = [];
  for(let i = 1; i<=3; i++){
    if(currentUser && currentUser.attributes && currentUser.attributes.profile && currentUser.attributes.profile.publicData){
      if(currentUser.attributes.profile.publicData["low_season_start_"+i]){
        lowSeasonsStart.push(currentUser.attributes.profile.publicData["low_season_start_"+i]);
      }
      if(currentUser.attributes.profile.publicData["low_season_end_"+i]){
        lowSeasonsEnd.push(currentUser.attributes.profile.publicData["low_season_end_"+i]);
      }

      if(currentUser.attributes.profile.publicData["mid_season_start_"+i]){
        midSeasonsStart.push(currentUser.attributes.profile.publicData["mid_season_start_"+i]);
      }
      if(currentUser.attributes.profile.publicData["mid_season_end_"+i]){
        midSeasonsEnd.push(currentUser.attributes.profile.publicData["mid_season_end_"+i]);
      }

      if(currentUser.attributes.profile.publicData["high_season_start_"+i]){
        highSeasonsStart.push(currentUser.attributes.profile.publicData["high_season_start_"+i]);
      }
      if(currentUser.attributes.profile.publicData["high_season_end_"+i]){
        highSeasonsEnd.push(currentUser.attributes.profile.publicData["high_season_end_"+i]);
      }
    }
  }

  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={{ price }}
      onSubmit={values => {
        const { 
          low_period_price_1,
          low_period_price_2,
          low_period_price_3,
          mid_period_price_1,
          mid_period_price_2,
          mid_period_price_3,
          high_period_price_1,
          high_period_price_2,
          high_period_price_3,
        } = values;
        const updateValues = {
          publicData: { 
            low_period_price_1,
            low_period_price_2,
            low_period_price_3,
            mid_period_price_1,
            mid_period_price_2,
            mid_period_price_3,
            high_period_price_1,
            high_period_price_2,
            high_period_price_3, 
          },
        };

        onSubmit(updateValues);
      }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      disabled={disabled}
      ready={ready}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
      lowSeasonsStart={lowSeasonsStart}
      lowSeasonsEnd={lowSeasonsEnd}
      midSeasonsStart={midSeasonsStart}
      midSeasonsEnd={midSeasonsEnd}
      highSeasonsStart={highSeasonsStart}
      highSeasonsEnd={highSeasonsEnd}
    />
  ) : (
    <div className={css.priceCurrencyInvalid}>
      <FormattedMessage id="EditListingPricingPanel.listingPriceCurrencyInvalid" />
    </div>
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPricingPanelComponent.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPricingPanelComponent.propTypes = {
  className: string,
  rootClassName: string,

  currentUser: propTypes.currentUser,

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

const mapStateToProps = state => {
  // Topbar needs isAuthenticated
  const { isAuthenticated, logoutError, authScopes } = state.Auth;
  // Topbar needs user info.
  const {
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  const hasGenericError = !!(logoutError || hasCurrentUserErrors(state));
  return {
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    notificationCount,
    isAuthenticated,
    authScopes,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    hasGenericError,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const EditListingPricingPanel = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditListingPricingPanelComponent);

export default EditListingPricingPanel;