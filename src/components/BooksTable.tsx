import { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
} from "@mui/material";
import Search from "./Search";
import { Book } from "../interfaces/Book.interface";
import BreadcrumbNav from "./BreadcrumbNav";
import BooksList from "./BooksList";

const BooksTable = (props: { query: string }) => {
  const initialQuery: string = props.query;
  const [query, setQuery] = useState<string>("");
  const [queryAuthor, setQueryAuthor] = useState<string>("");
  const [initialData, setInitialData] = useState<Book[]>([]);
  const [selectedRow, setSelectedRow] = useState<Book | null>();
  const [newData, setNewData] = useState<Book[]>([]);
  const [additionalBooksData, setAdditionalBooksData] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${initialQuery}&orderBy=newest&maxResults=10`
      )
      .then((response) => {
        setInitialData(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchData = async (query: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&maxResults=10`
      );
      return response.data.items;
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowClick = async (row: Book) => {
    setSelectedRow(row);
    setQueryAuthor(row.volumeInfo.authors.join(", "));
    const fetchedData = await fetchData(row.volumeInfo.authors.join(", "));
    setAdditionalBooksData(fetchedData);
  };

  return (
    <Grid item xs={12}>
      <div
        className="books-table"
        // data-testid="books-table"
      >
        <Search
          query={query}
          setNewData={setNewData}
          fetchData={fetchData}
          setQuery={setQuery}
        />
        <BreadcrumbNav
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          setNewData={setNewData}
          newData={newData}
          query={query}
          queryAuthor={queryAuthor}
        />
        <div className="container">
          <TableContainer component={Paper} style={{ maxWidth: "100%" }}>
            <Table size="small" className="table" aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Kind</TableCell>
                  <TableCell>Pages</TableCell>
                  <TableCell>Book cover</TableCell>
                  <TableCell>Language</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newData.length > 0
                  ? newData.map((row, index) => (
                      <TableRow
                        key={row.id + "row" + index}
                        onClick={() => handleRowClick(row)}
                        className={
                          selectedRow === row ? "table-row__selected" : ""
                        }
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.volumeInfo.title}</TableCell>
                        <TableCell>
                          {row.volumeInfo.authors?.join(", ")}
                        </TableCell>
                        <TableCell>{row.volumeInfo.printType}</TableCell>
                        <TableCell align="center">
                          {row.volumeInfo.pageCount
                            ? row.volumeInfo.pageCount
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <img
                            className="thumbnail"
                            src={
                              row.volumeInfo.imageLinks
                                ? row.volumeInfo.imageLinks.smallThumbnail
                                : "https://placehold.co/64x100"
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          {row.volumeInfo.language}
                        </TableCell>
                      </TableRow>
                    ))
                  : initialData.map((row, index) => (
                      <TableRow
                        key={row.id + "row" + index}
                        onClick={() => handleRowClick(row)}
                        className={
                          selectedRow === row ? "table-row__selected" : ""
                        }
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.volumeInfo.title}</TableCell>
                        <TableCell>
                          {row.volumeInfo.authors.join(", ")}
                        </TableCell>
                        <TableCell>{row.volumeInfo.printType}</TableCell>
                        <TableCell align="center">
                          {row.volumeInfo.pageCount
                            ? row.volumeInfo.pageCount
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <img
                            className="thumbnail"
                            src={
                              row.volumeInfo.imageLinks
                                ? row.volumeInfo.imageLinks.smallThumbnail
                                : "https://placehold.co/64x100"
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          {row.volumeInfo.language}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <BooksList
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            additionalBooksData={additionalBooksData}
          />
        </div>
      </div>
    </Grid>
  );
};

export default BooksTable;
