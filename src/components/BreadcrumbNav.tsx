import { Breadcrumbs, Typography, Link } from "@mui/material";
import { Book } from "../interfaces/Book.interface";
import { Dispatch, SetStateAction } from "react";

interface BreadcrumbNavProps {
  setSelectedRow: Dispatch<SetStateAction<Book | null | undefined>>;
  setNewData: (data: Book[]) => void;
  selectedRow: Book | null | undefined;
  newData: Book[];
  query: string;
  queryAuthor: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  setSelectedRow,
  setNewData,
  selectedRow,
  newData,
  query,
  queryAuthor,
}) => {
  const handleLinkClick = async () => {
    setSelectedRow(null);
  };

  const handleLinkClickInitialData = async () => {
    setSelectedRow(null);

    setNewData([]);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
      <Typography color="inherit">
        <Link
          underline="none"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => handleLinkClickInitialData()}
        >
          Books
        </Link>
      </Typography>
      {newData.length > 0 && query && (
        <Typography
          color={
            selectedRow?.volumeInfo.authors.join(", ")
              ? "inherit"
              : "text.primary"
          }
        >
          <Link
            underline="none"
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={() => handleLinkClick()}
          >
            {query}
          </Link>
        </Typography>
      )}
      {selectedRow !== null && (
        <Typography color="text.primary">{queryAuthor}</Typography>
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
