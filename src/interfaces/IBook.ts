export interface IBookResp {
  id: string;
  etag: string;
  kind: string;
  selfLink: string;
  accessInfo: {};
  searchInfo: {};
  saleInfo: {
    isEbook: boolean;
  };
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    imageLinks: {
      thumbnail?: string;
    };
  };
}

export interface IAds extends IBookResp {
  isAds: boolean;
}
