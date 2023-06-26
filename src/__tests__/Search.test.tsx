import { render, fireEvent, waitFor } from "@testing-library/react";
import Search from "../components/Search";

const mockFetchData = jest.fn();
const mockSetNewData = jest.fn();
const mockSetQuery = jest.fn();

describe("Search Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the query state when input value changes", () => {
    const { getByLabelText } = render(
      <Search
        query=""
        setNewData={mockSetNewData}
        fetchData={mockFetchData}
        setQuery={mockSetQuery}
      />
    );

    const searchInput = getByLabelText("Search");

    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(mockSetQuery).toHaveBeenCalledWith("test");
  });

  it("should call fetchData and setNewData when form is submitted", async () => {
    mockFetchData.mockResolvedValueOnce([
      {
        id: "1",
        volumeInfo: {
          title: "Test Book",
          authors: [],
          description: "",
          printType: "",
          imageLinks: {
            smallThumbnail: "",
          },
          pageCount: 0,
          language: "",
        },
      },
    ]);

    const { getAllByText } = render(
      <Search
        query="test"
        setNewData={mockSetNewData}
        fetchData={mockFetchData}
        setQuery={mockSetQuery}
      />
    );

    const submitButton = getAllByText("Submit")[0];

    fireEvent.click(submitButton);

    expect(mockFetchData).toHaveBeenCalledWith("test");

    await waitFor(() => {
      expect(mockSetNewData).toHaveBeenCalledWith([
        {
          id: "1",
          volumeInfo: {
            title: "Test Book",
            authors: [],
            description: "",
            printType: "",
            imageLinks: {
              smallThumbnail: "",
            },
            pageCount: 0,
            language: "",
          },
        },
      ]);
    });
  });
});
