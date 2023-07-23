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
    imageLinks: {
      thumbnail?: string;
    };
  };
}
