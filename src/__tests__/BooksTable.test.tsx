import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import BooksTable from "../components/BooksTable";
import { act } from "react-dom/test-utils";
import "@testing-library/react-hooks";

jest.mock("axios", () => ({
  get: jest.fn((url) => {
    if (url.includes("new query")) {
      return Promise.resolve({
        data: {
          items: [
            /* test data */
          ],
        },
      });
    } else {
      return Promise.resolve({ data: { items: [] } });
    }
  }),
}));

describe("BooksTable", () => {
  it("fetches initial data when the component mounts", () => {
    render(<BooksTable query="initial" />);

    expect(axios.get).toHaveBeenCalledWith(
      "https://www.googleapis.com/books/v1/volumes?q=initial&orderBy=newest&maxResults=10"
    );
  });

  it("performs search and updates the table data", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        items: [
          /* test data */
        ],
      },
    });
    const { getByLabelText } = render(<BooksTable query="initial" />);

    const searchInput = getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "new query" } });

    await act(async () => {
      const searchButton = document.querySelector(
        ".search-button"
      ) as HTMLElement;

      fireEvent.click(searchButton);
      await waitFor(() =>
        expect(axios.get).toHaveBeenCalledWith(
          "https://www.googleapis.com/books/v1/volumes?q=new query&orderBy=newest&maxResults=10"
        )
      );
    });

    const table = document.querySelector(".books-table") as HTMLElement;
    expect(table).toBeTruthy();
  });
});
