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
  const { price, publicData } = currentListing.attributes;

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

  const low_period_price_1 = publicData && publicData.low_period_price_1 ? publicData.low_period_price_1 : null;
  const low_period_price_2 = publicData && publicData.low_period_price_2 ? publicData.low_period_price_2 : null;
  const low_period_price_3 = publicData && publicData.low_period_price_3 ? publicData.low_period_price_3 : null;

  const mid_period_price_1 = publicData && publicData.mid_period_price_1 ? publicData.mid_period_price_1 : null;
  const mid_period_price_2 = publicData && publicData.mid_period_price_2 ? publicData.mid_period_price_2 : null;
  const mid_period_price_3 = publicData && publicData.mid_period_price_3 ? publicData.mid_period_price_3 : null;

  const high_period_price_1 = publicData && publicData.high_period_price_1 ? publicData.high_period_price_1 : null;
  const high_period_price_2 = publicData && publicData.high_period_price_2 ? publicData.high_period_price_2 : null;
  const high_period_price_3 = publicData && publicData.high_period_price_3 ? publicData.high_period_price_3 : null;

  const low_period_price_1_money = low_period_price_1 ? new Money(low_period_price_1.amount, low_period_price_1.currency) : null;
  const low_period_price_2_money = low_period_price_2 ? new Money(low_period_price_2.amount, low_period_price_2.currency) : null;
  const low_period_price_3_money = low_period_price_3 ? new Money(low_period_price_3.amount, low_period_price_3.currency) : null;

  const mid_period_price_1_money = mid_period_price_1 ? new Money(mid_period_price_1.amount, mid_period_price_1.currency) : null;
  const mid_period_price_2_money = mid_period_price_2 ? new Money(mid_period_price_2.amount, mid_period_price_2.currency) : null;
  const mid_period_price_3_money = mid_period_price_3 ? new Money(mid_period_price_3.amount, mid_period_price_3.currency) : null;

  const high_period_price_1_money = high_period_price_1 ? new Money(high_period_price_1.amount, high_period_price_1.currency) : null;
  const high_period_price_2_money = high_period_price_2 ? new Money(high_period_price_2.amount, high_period_price_2.currency) : null;
  const high_period_price_3_money = high_period_price_3 ? new Money(high_period_price_3.amount, high_period_price_3.currency) : null;

  const initialValues = { 
    price,
    low_period_price_1: low_period_price_1_money,
    low_period_price_2: low_period_price_2_money,
    low_period_price_3: low_period_price_3_money,
    mid_period_price_1: mid_period_price_1_money,
    mid_period_price_2: mid_period_price_2_money,
    mid_period_price_3: mid_period_price_3_money,
    high_period_price_1: high_period_price_1_money,
    high_period_price_2: high_period_price_2_money,
    high_period_price_3: high_period_price_3_money,
  };


  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values);
        const { 
          price,
          low_period_price_1 = null,
          low_period_price_2 = null,
          low_period_price_3 = null,
          mid_period_price_1 = null,
          mid_period_price_2 = null,
          mid_period_price_3 = null,
          high_period_price_1 = null,
          high_period_price_2 = null,
          high_period_price_3 = null,
        } = values;
        const updateValues = {
          price,
          publicData: { 
            low_period_price_1: low_period_price_1 ? {amount: low_period_price_1.amount, currency: low_period_price_1.currency} : null,
            low_period_price_2: low_period_price_2 ? {amount: low_period_price_2.amount, currency: low_period_price_2.currency} : null,
            low_period_price_3: low_period_price_3 ? {amount: low_period_price_3.amount, currency: low_period_price_3.currency} : null,
            mid_period_price_1: mid_period_price_1 ? {amount: mid_period_price_1.amount, currency: mid_period_price_1.currency} : null,
            mid_period_price_2: mid_period_price_2 ? {amount: mid_period_price_2.amount, currency: mid_period_price_2.currency} : null,
            mid_period_price_3: mid_period_price_3 ? {amount: mid_period_price_3.amount, currency: mid_period_price_3.currency} : null,
            high_period_price_1: high_period_price_1 ? {amount: high_period_price_1.amount, currency: high_period_price_1.currency} : null,
            high_period_price_2: high_period_price_2 ? {amount: high_period_price_2.amount, currency: high_period_price_2.currency} : null,
            high_period_price_3: high_period_price_3 ? {amount: high_period_price_3.amount, currency: high_period_price_3.currency} : null,
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