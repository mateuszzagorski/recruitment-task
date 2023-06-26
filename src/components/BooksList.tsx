import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Book } from "../interfaces/Book.interface";
interface BooksListProps {
  selectedRow: Book | null | undefined;
  setSelectedRow: React.Dispatch<React.SetStateAction<Book | null | undefined>>;
  additionalBooksData: Book[];
}

const BooksList: React.FC<BooksListProps> = ({
  selectedRow,
  setSelectedRow,
  additionalBooksData,
}) => {
  const closeDetailsBox = () => {
    setSelectedRow(null);
  };

  if (!selectedRow) {
    return null;
  }
  return (
    <Box className="books-list-box">
      <List>
        <ListItem>
          <ListItemText>
            Book list by {selectedRow.volumeInfo.authors.join(", ")}:
          </ListItemText>
          <CancelIcon
            className="button-cancel"
            onClick={() => closeDetailsBox()}
            sx={{
              padding: "10px 0",
              alignItems: "right",
            }}
          />
        </ListItem>
        {additionalBooksData.map((item, index) => {
          return (
            <div key={item.id + index}>
              {/* Many of the books are added multiple times so the id's are not unique unfortunately */}
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Book cover"
                    src={
                      item.volumeInfo.imageLinks
                        ? item.volumeInfo.imageLinks.smallThumbnail
                        : "https://placehold.co/64x100"
                    }
                  />
                </ListItemAvatar>
                <ListItemText>
                  {item.volumeInfo.title.length > 50
                    ? item.volumeInfo.title.slice(0, 75) + "..."
                    : item.volumeInfo.title}
                </ListItemText>
              </ListItem>
              {index < additionalBooksData.length - 1 && <Divider />}
            </div>
          );
        })}
        ;
      </List>
    </Box>
  );
};

export default BooksList;
