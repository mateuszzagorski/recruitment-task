import { Dispatch, SetStateAction } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { Book } from "../interfaces/Book.interface";
import "@testing-library/jest-dom";
interface BreadcrumbNavProps {
  setSelectedRow: Dispatch<SetStateAction<Book | null | undefined>>;
  setNewData: (data: Book[]) => void;
  selectedRow: Book | null | undefined;
  newData: Book[];
  query: string;
  queryAuthor: string;
}

describe("BreadcrumbNav", () => {
  const setSelectedRowMock = jest.fn();
  const setNewDataMock = jest.fn();

  const props: BreadcrumbNavProps = {
    setSelectedRow: setSelectedRowMock,
    setNewData: setNewDataMock,
    selectedRow: null,
    newData: [],
    query: "",
    queryAuthor: "",
  };

  it('renders the "Books" link correctly', () => {
    render(<BreadcrumbNav {...props} />);
    const booksLink = screen.getByText("Books");
    expect(booksLink).toBeInTheDocument();
  });

  it('when the "Books" link is clicked calls setNewData correctly', () => {
    render(<BreadcrumbNav {...props} />);
    const booksLink = screen.getAllByText("Books")[0];
    userEvent.click(booksLink);
    expect(setNewDataMock).toHaveBeenCalledWith([]);
  });

  it("renders the query link, when newData and query are not empty", () => {
    const propsWithQuery: BreadcrumbNavProps = {
      ...props,
      newData: [
        {
          id: "1",
          volumeInfo: {
            title: "Book 1",
            authors: ["Author 1"],
            description: "",
            printType: "",
            imageLinks: { smallThumbnail: "" },
            pageCount: 0,
            language: "",
          },
        },
      ],
      query: "React",
    };
    render(<BreadcrumbNav {...propsWithQuery} />);
    const queryLink = screen.getByText("React");
    expect(queryLink).toBeInTheDocument();
  });

  it("when newData is empty does not render query link", () => {
    const propsWithQuery: BreadcrumbNavProps = { ...props, query: "tomato" };
    render(<BreadcrumbNav {...propsWithQuery} />);
    const queryLink = screen.queryByText("tomato");
    expect(queryLink).not.toBeInTheDocument();
  });

  it("renders the queryAuthor text when selectedRow is not null", () => {
    const propsWithSelectedRow: BreadcrumbNavProps = {
      ...props,
      selectedRow: {
        id: "1",
        volumeInfo: {
          title: "Book 1",
          authors: ["Author 1"],
          description: "",
          printType: "",
          imageLinks: { smallThumbnail: "" },
          pageCount: 0,
          language: "",
        },
      },
      queryAuthor: "Author 1",
    };
    render(<BreadcrumbNav {...propsWithSelectedRow} />);
    const queryAuthorText = screen.getByText("Author 1");
    expect(queryAuthorText).toBeInTheDocument();
  });
});
