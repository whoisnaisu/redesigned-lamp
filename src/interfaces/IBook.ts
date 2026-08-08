export interface IBookResp {
  id: string;
  etag?: string;
  kind?: string;
  selfLink?: string;
  accessInfo?: {};
  searchInfo?: {};
  isAds?: boolean;
  saleInfo?: {
    isEbook?: boolean;
  };
  volumeInfo?: {
    title?: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    infoLink?: string;
    industryIdentifiers?: [
      {
        type: string;
        identifier: string;
      }
    ];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
}
