export type FomoLinkType = 'page' | 'collection' | 'category';

export interface FomoSettingsData {
  isActive: boolean;
  text: string;
  targetDate: number;
  buttonText: string;
  linkType: FomoLinkType;
  linkId: string; // pageId | collectionId | categoryId
}
