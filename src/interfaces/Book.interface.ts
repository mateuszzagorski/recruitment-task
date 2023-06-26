export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    printType: string;
    imageLinks: {
      smallThumbnail: string;
    };
    pageCount: number;
    language: string;
  };
}
