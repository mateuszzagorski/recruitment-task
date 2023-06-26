import React from "react";
import { TextField, Button } from "@mui/material";
import { Book } from "../interfaces/Book.interface";

interface SearchProps {
  query: string;
  setNewData: (data: Book[]) => void;
  fetchData: (query: string) => Promise<Book[]>;
  setQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({
  query,
  setNewData,
  fetchData,
  setQuery,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.length > 0) {
      const fetchedData = await fetchData(query);
      setNewData(fetchedData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
      <Button
        className="search-button"
        type="submit"
        variant="outlined"
        sx={{
          padding: "15px",
          marginLeft: "5px",
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default Search;
