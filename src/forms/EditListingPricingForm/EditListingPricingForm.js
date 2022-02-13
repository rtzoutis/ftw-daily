import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput } from '../../components';
import css from './EditListingPricingForm.module.css';

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        lowSeasonsStart,
        lowSeasonsEnd,
        midSeasonsStart,
        midSeasonsEnd,
        highSeasonsStart,
        highSeasonsEnd,
      } = formRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};
      
      console.log(lowSeasonsStart);

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}

          {lowSeasonsStart.map((date, idx) => {
              return <p key={"low_" + date}>
                <label style={{textDecoration: "underline"}}>Low Season Period ({lowSeasonsStart[idx]} - {lowSeasonsEnd[idx]})</label>
                <FieldCurrencyInput
                    id={"low_period_price_"+idx}
                    name={"low_period_price_"+idx}
                    className={css.priceInput}
                    label={pricePerUnitMessage}
                    placeholder={pricePlaceholderMessage}
                    currencyConfig={config.currencyConfig}
                    validate={priceValidators}
                  />
              </p>
            })
          }

          {midSeasonsStart.map((date, idx) => {
              return <p key={"mid_" + date}>
                <label style={{textDecoration: "underline"}}>Mid Season Period ({midSeasonsStart[idx]} - {midSeasonsEnd[idx]})</label>
                <FieldCurrencyInput
                    id={"mid_period_price_"+idx}
                    name={"mid_period_price_"+idx}
                    className={css.priceInput}
                    label={pricePerUnitMessage}
                    placeholder={pricePlaceholderMessage}
                    currencyConfig={config.currencyConfig}
                    validate={priceValidators}
                  />
              </p>
            })
          }

          {highSeasonsStart.map((date, idx) => {
              return <p key={"high_" + date}>
                <label style={{textDecoration: "underline"}}>High Season Period ({highSeasonsStart[idx]} - {highSeasonsEnd[idx]})</label>
                <FieldCurrencyInput
                    id={"high_period_price_"+idx}
                    name={"high_period_price_"+idx}
                    className={css.priceInput}
                    label={pricePerUnitMessage}
                    placeholder={pricePlaceholderMessage}
                    currencyConfig={config.currencyConfig}
                    validate={priceValidators}
                  />
              </p>
            })
          }

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

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
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
};

export default compose(injectIntl)(EditListingPricingFormComponent);
