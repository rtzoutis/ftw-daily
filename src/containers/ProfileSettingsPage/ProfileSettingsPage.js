import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';
import { ProfileSettingsForm } from '../../forms';
import { TopbarContainer } from '../../containers';

import { updateProfile, uploadImage } from './ProfileSettingsPage.duck';
import css from './ProfileSettingsPage.module.css';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export class ProfileSettingsPageComponent extends Component {
  render() {
    const {
      currentUser,
      image,
      onImageUpload,
      onUpdateProfile,
      scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
      intl,
    } = this.props;

    const handleSubmit = values => {
      console.log(values);
      const { 
        firstName,
        lastName,
        bio: rawBio,
        company_display_name,
        company_description,
        address,
        additional_address,
        company_legal_name,
        vat,
        tax_office,
        registered_address,
        low_season_start_1,
        mid_season_start_1,
        high_season_start_1,
        low_season_end_1,
        mid_season_end_1,
        high_season_end_1,
        low_season_start_2,
        mid_season_start_2,
        high_season_start_2,
        low_season_end_2,
        mid_season_end_2,
        high_season_end_2,
        low_season_start_3,
        mid_season_start_3,
        high_season_start_3,
        low_season_end_3,
        mid_season_end_3,
        high_season_end_3,
        road_types,
        sea_types,
        discount_days_1,
        discount_days_2,
        discount_days_3,
        discount_days_4,
        discount_days_5,
        discount_days_6,
        discount_days_7,
        discount_days_8,
        discount_days_9,
        discount_days_10,
        discount_percentages_1,
        discount_percentages_2,
        discount_percentages_3,
        discount_percentages_4,
        discount_percentages_5,
        discount_percentages_6,
        discount_percentages_7,
        discount_percentages_8,
        discount_percentages_9,
        discount_percentages_10,
        delivery_methods,
      } = values;

      // Ensure that the optional bio is a string
      const bio = rawBio || '';

      const profile = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        bio,
        publicData:{
          company_display_name,
          company_description,
          address,
          additional_address,
          company_legal_name,
          vat,
          tax_office,
          registered_address,
          low_season_start_1,
          mid_season_start_1,
          high_season_start_1,
          low_season_end_1,
          mid_season_end_1,
          high_season_end_1,
          low_season_start_2,
          mid_season_start_2,
          high_season_start_2,
          low_season_end_2,
          mid_season_end_2,
          high_season_end_2,
          low_season_start_3,
          mid_season_start_3,
          high_season_start_3,
          low_season_end_3,
          mid_season_end_3,
          high_season_end_3,
          road_types,
          sea_types,
          discount_days_1,
          discount_days_2,
          discount_days_3,
          discount_days_4,
          discount_days_5,
          discount_days_6,
          discount_days_7,
          discount_days_8,
          discount_days_9,
          discount_days_10,
          discount_percentages_1,
          discount_percentages_2,
          discount_percentages_3,
          discount_percentages_4,
          discount_percentages_5,
          discount_percentages_6,
          discount_percentages_7,
          discount_percentages_8,
          discount_percentages_9,
          discount_percentages_10,
          delivery_methods,
        },
      };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? { ...profile, profileImageId: uploadedImage.imageId }
          : profile;

      onUpdateProfile(updatedValues);
    };

    const user = ensureCurrentUser(currentUser);
    const { firstName, lastName, bio, publicData } = user.attributes.profile;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };

    const profileSettingsForm = user.id ? (
      <ProfileSettingsForm
        className={css.form}
        currentUser={currentUser}
        initialValues={{
          firstName,
          lastName,
          bio, 
          company_display_name: publicData.company_display_name,
          company_description: publicData.company_description,
          address: publicData.address,
          additional_address: publicData.additional_address,
          company_legal_name: publicData.company_legal_name,
          vat: publicData.vat,
          tax_office: publicData.tax_office,
          registered_address: publicData.registered_address,
          low_season_start_1: publicData.low_season_start_1,
          mid_season_start_1: publicData.mid_season_start_1,
          high_season_start_1: publicData.high_season_start_1,
          low_season_end_1: publicData.low_season_end_1,
          mid_season_end_1: publicData.mid_season_end_1,
          high_season_end_1: publicData.high_season_end_1,
          low_season_start_2: publicData.low_season_start_2,
          mid_season_start_2: publicData.mid_season_start_2,
          high_season_start_2: publicData.high_season_start_2,
          low_season_end_2: publicData.low_season_end_2,
          mid_season_end_2: publicData.mid_season_end_2,
          high_season_end_2: publicData.high_season_end_2,
          low_season_start_3: publicData.low_season_start_3,
          mid_season_start_3: publicData.mid_season_start_3,
          high_season_start_3: publicData.high_season_start_3,
          low_season_end_3: publicData.low_season_end_3,
          mid_season_end_3: publicData.mid_season_end_3,
          high_season_end_3: publicData.high_season_end_3,
          road_types: publicData.road_types,
          sea_types: publicData.sea_types,
          discount_days_1: publicData.discount_days_1,
          discount_days_2: publicData.discount_days_2,
          discount_days_3: publicData.discount_days_3,
          discount_days_4: publicData.discount_days_4,
          discount_days_5: publicData.discount_days_5,
          discount_days_6: publicData.discount_days_6,
          discount_days_7: publicData.discount_days_7,
          discount_days_8: publicData.discount_days_8,
          discount_days_9: publicData.discount_days_9,
          discount_days_10: publicData.discount_days_10,
          discount_percentages_1: publicData.discount_percentages_1,
          discount_percentages_2: publicData.discount_percentages_2,
          discount_percentages_3: publicData.discount_percentages_3,
          discount_percentages_4: publicData.discount_percentages_4,
          discount_percentages_5: publicData.discount_percentages_5,
          discount_percentages_6: publicData.discount_percentages_6,
          discount_percentages_7: publicData.discount_percentages_7,
          discount_percentages_8: publicData.discount_percentages_8,
          discount_percentages_9: publicData.discount_percentages_9,
          discount_percentages_10: publicData.discount_percentages_10,
          delivery_methods: publicData.delivery_methods,
          profileImage: user.profileImage,
        }}
        profileImage={profileImage}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
        onSubmit={handleSubmit}
      />
    ) : null;

    const title = intl.formatMessage({ id: 'ProfileSettingsPage.title' });

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfileSettingsPage" />
            <UserNav selectedPageName="ProfileSettingsPage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="ProfileSettingsPage.heading" />
                </h1>
                {user.id ? (
                  <NamedLink
                    className={css.profileLink}
                    name="ProfilePage"
                    params={{ id: user.id.uuid }}
                  >
                    <FormattedMessage id="ProfileSettingsPage.viewProfileLink" />
                  </NamedLink>
                ) : null}
              </div>
              {profileSettingsForm}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ProfileSettingsPageComponent.defaultProps = {
  currentUser: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
};

const { bool, func, object, shape, string } = PropTypes;

ProfileSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  return {
    currentUser,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

const ProfileSettingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ProfileSettingsPageComponent);

export default ProfileSettingsPage;
