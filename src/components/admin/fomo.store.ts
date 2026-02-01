import { FomoSettingsData } from './fomo.types';

let fomoSettings: FomoSettingsData = {
  isActive: false,
  text: 'LIMITED TIME DEALS',
  targetDate: Date.now() + 45 * 60000,
  buttonText: 'SHOP NOW',
  linkType: 'collection',
  linkId: ''
};

export const getFomoSettings = () => {
  return fomoSettings;
};

export const updateFomoSettings = (data: FomoSettingsData) => {
  fomoSettings = data;
};
