/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */

export const filters = [
  {
    id: 'dates',
    label: 'Dates',
    type: 'BookingDateRangeFilter',
    group: 'primary',
    // Note: BookingDateRangeFilter is fixed filter,
    // you can't change "queryParamNames: ['dates'],"
    queryParamNames: ['dates'],
    config: {},
  },
  {
    id: 'price',
    label: 'Price',
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
    },
  },
  {
    id: 'keyword',
    label: 'Keyword',
    type: 'KeywordFilter',
    group: 'primary',
    // Note: KeywordFilter is fixed filter,
    // you can't change "queryParamNames: ['keywords'],"
    queryParamNames: ['keywords'],
    // NOTE: If you are ordering search results by distance
    // the keyword search can't be used at the same time.
    // You can turn on/off ordering by distance from config.js file.
    config: {},
  },
  {
    id: 'category',
    label: 'Category',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'road', label: 'Road' },
        { key: 'sea', label: 'Sea' },
      ],
    },
  },
  {
    id: 'subcategory',
    label: 'Subcategory',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_subcategory'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'car', label: 'Car', category: 'road' },
        { key: 'motorcycle', label: 'Motorcycle', category: 'road' },
        { key: 'bicycle', label: 'Standard Bicycle', category: 'road' },
        { key: 'ebike', label: 'E-Bike', category: 'road' },
        { key: 'quad', label: 'Quad Bike', category: 'road' },
        { key: 'buggy', label: 'Buggy', category: 'road' },
        { key: 'scooter', label: 'Scooter', category: 'road' },
        { key: 'escooter', label: 'E-Scooter', category: 'road' },
        { key: 'rib', label: 'Rib', category: 'sea' },
        { key: 'sailboat', label: 'Sailboat', category: 'sea' },
        { key: 'canoe', label: 'Canoe', category: 'sea' },
        { key: 'surfboard', label: 'Surfboard', category: 'sea' },
        { key: 'yacht', label: 'Yacht', category: 'sea' },
      ],
    },
  },
  {
    id: 'delivery_method',
    label: 'Delivery Method',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_delivery_method'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'pickup', label: 'Pickup' },
        { key: 'shipping', label: 'Shipping' },
      ],
    },
  },
  {
    id: 'types',
    label: 'Type',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_types'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      searchMode: 'has_any',
      options: [
        { key: 'small', label: 'Small', subcategory: 'car' },
        { key: 'suv', label: 'SUV', subcategory: 'car' },
        { key: 'automatic', label: 'Automatic', subcategory: 'car' },
        { key: 'sedan', label: 'Sedan', subcategory: 'car' },
        { key: 'cabrio', label: 'Cabrio', subcategory: 'car' },
        { key: 'comfort', label: 'Comfort', subcategory: 'car' },
        { key: 'compact', label: 'Compact', subcategory: 'car' },
        { key: 'convertible', label: 'Convertible', subcategory: 'car' },
        { key: 'economy', label: 'Economy', subcategory: 'car' },
        { key: 'executive', label: 'Executive', subcategory: 'car' },
        { key: 'family', label: 'Family', subcategory: 'car' },
        { key: 'jeep', label: 'Jeep', subcategory: 'car' },
        { key: 'minibus', label: 'Mini Bus', subcategory: 'car' },
        { key: 'minivan', label: 'Mini Van', subcategory: 'car' },
        { key: 'van', label: 'Van', subcategory: 'car' },
        //
        { key: 'adventure', label: 'Adventure', subcategory: 'motorcycle' },
        { key: 'cruiser', label: 'Cruiser', subcategory: 'motorcycle' },
        { key: 'naked', label: 'Naked', subcategory: 'motorcycle' },
        { key: 'sportsbike', label: 'Sportsbike', subcategory: 'motorcycle' },
        { key: 'tourer', label: 'Tourer', subcategory: 'motorcycle' },
        { key: 'sportstourer', label: 'Sports Tourer', subcategory: 'motorcycle' },
        { key: 'dualsport', label: 'Dual Sport', subcategory: 'motorcycle' },
        { key: 'classic', label: 'Classic', subcategory: 'motorcycle' },
        { key: 'offroad', label: 'Off-road', subcategory: 'motorcycle' },
        { key: 'scooter', label: 'Scooter', subcategory: 'motorcycle' },
        { key: 'moped', label: 'Moped', subcategory: 'motorcycle' },
        { key: 'electric', label: 'Electric', subcategory: 'motorcycle' },
        { key: 'custom', label: 'Custom', subcategory: 'motorcycle' },
        //
        { key: 'road', label: 'Road', subcategory: 'bicycle' },
        { key: 'cyclocross', label: 'Cyclocross', subcategory: 'bicycle' },
        { key: 'mountain', label: 'Mountain', subcategory: 'bicycle' },
        { key: 'fitness', label: 'Fitness', subcategory: 'bicycle' },
        { key: 'touring', label: 'Touring', subcategory: 'bicycle' },
        { key: 'folding', label: 'Folding', subcategory: 'bicycle' },
        { key: 'track', label: 'Track/Fixed-Gear', subcategory: 'bicycle' },
        { key: 'bmx', label: 'BMX', subcategory: 'bicycle' },
        { key: 'recumbent', label: 'Recumbent', subcategory: 'bicycle' },
        { key: 'utility', label: 'Utility', subcategory: 'bicycle' },
        { key: 'city', label: 'City', subcategory: 'bicycle' },
        { key: 'cruiser', label: 'Cruiser', subcategory: 'bicycle' },
        { key: 'hybrid', label: 'Hybrid', subcategory: 'bicycle' },
        { key: 'dualsport', label: 'Dual-Sport', subcategory: 'bicycle' },
        { key: 'flatfoot_comfort', label: 'Flat-Foot Comfort', subcategory: 'bicycle' },
        { key: 'tandem', label: 'Tandem', subcategory: 'bicycle' },
        { key: 'tricycle', label: 'Tricycle', subcategory: 'bicycle' },
        //
        { key: 'hybrid', label: 'Hybrids/commuter', subcategory: 'ebike' },
        { key: 'road', label: 'Road', subcategory: 'ebike' },
        { key: 'offroad', label: 'Off-road', subcategory: 'ebike' },
        { key: 'mountain', label: 'Mountain', subcategory: 'ebike' },
        { key: 'ecargo', label: 'E-cargo', subcategory: 'ebike' },
        { key: 'folding', label: 'Folding', subcategory: 'ebike' },
        { key: 'speedpedelecs', label: 'Speed-pedelecs', subcategory: 'ebike' },
        { key: 'cruiser', label: 'Cruiser', subcategory: 'ebike' },
        //
        { key: 'utility', label: 'Utility', subcategory: 'quad' },
        { key: 'offroad', label: 'Off-road', subcategory: 'quad' },
        { key: 'sport', label: 'Sport', subcategory: 'quad' },
        { key: 'sxs', label: 'Side-by-side (SxS)', subcategory: 'quad' },
        { key: 'youth', label: 'Youth', subcategory: 'quad' },
        { key: 'atv', label: 'ATV', subcategory: 'quad' },
      ],
    },
  },
  {
    id: 'color',
    label: 'Color',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_color'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'white', label: 'White' },
        { key: 'black', label: 'Black' },
        { key: 'gray', label: 'Gray' },
        { key: 'silver', label: 'Silver' },
        { key: 'red', label: 'Red' },
        { key: 'blue', label: 'Blue' },
        { key: 'various', label: 'Various' },
      ],
    },
  },
  {
    id: 'type',
    label: 'Type',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_type'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        { key: 'smoke', label: 'Smoke' },
        { key: 'electric', label: 'Electric' },
        { key: 'wood', label: 'Wood' },
        { key: 'other', label: 'Other' },
      ],
    },
  },
  {
    id: 'amenities',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'towels',
          label: 'Towels',
        },
        {
          key: 'bathroom',
          label: 'Bathroom',
        },
        {
          key: 'swimming_pool',
          label: 'Swimming pool',
        },
        {
          key: 'own_drinks',
          label: 'Own drinks allowed',
        },
        {
          key: 'jacuzzi',
          label: 'Jacuzzi',
        },
        {
          key: 'audiovisual_entertainment',
          label: 'Audiovisual entertainment',
        },
        {
          key: 'barbeque',
          label: 'Barbeque',
        },
        {
          key: 'own_food_allowed',
          label: 'Own food allowed',
        },
      ],
    },
  },
  {
    id: 'features',
    label: 'Features',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_features'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        //car
        { key: 'airconditioning', label: 'Air-conditioning', subcategory: 'car' },
        { key: 'seats2', label: '2-seats', subcategory: 'car' },
        { key: 'seats5', label: '5-seats', subcategory: 'car' },
        { key: 'seatsgt5', label: '>5-seats', subcategory: 'car' },
        { key: 'doors2', label: '2 doors', subcategory: 'car' },
        { key: 'doors4', label: '4 doors', subcategory: 'car' },
        //motorcycle
        { key: 'abs', label: 'ABS', subcategory: 'motorcycle' },
        { key: 'asc', label: 'ASC traction control', subcategory: 'motorcycle' },
        { key: 'luggage', label: 'Complete luggage system', subcategory: 'motorcycle' },
        { key: 'gpsmount', label: 'GPS mount', subcategory: 'motorcycle' },
        //standard bicycle
        { key: 'handlebarmirrors', label: 'Handlebar Mirrors', subcategory: 'bicycle' },
        { key: 'frontheadlight', label: 'Front Headlight', subcategory: 'bicycle' },
        { key: 'rearflashers', label: 'Rear Flashers', subcategory: 'bicycle' },
        { key: 'reflectors', label: 'Reflectors', subcategory: 'bicycle' },
        { key: 'bells', label: 'Bells', subcategory: 'bicycle' },
        //e-bikes
        { key: 'seat1', label: '1-seat', subcategory: 'ebike' },
        { key: 'seats2', label: '2-seats', subcategory: 'ebike' },
        { key: 'starter', label: 'Starter', subcategory: 'ebike' },
        { key: 'topbox', label: 'Top box', subcategory: 'ebike' },
        { key: 'aircooled', label: 'Air-cooled', subcategory: 'ebike' },
        { key: 'liquidcooled', label: 'Liquid-cooled', subcategory: 'ebike' },
        { key: 'reargear', label: 'Rear gear', subcategory: 'ebike' },
        { key: 'auto', label: 'Auto', subcategory: 'ebike' },
      ],
    },
  },
];

export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Keyword filter is sorting the results already by relevance.
  // If keyword filter is active, we need to disable sorting.
  conflictingFilters: ['keyword'],

  options: [
    { key: 'createdAt', label: 'Newest' },
    { key: '-createdAt', label: 'Oldest' },
    { key: '-price', label: 'Lowest price' },
    { key: 'price', label: 'Highest price' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'Relevance', longLabel: 'Relevance (Keyword search)' },
  ],
};
