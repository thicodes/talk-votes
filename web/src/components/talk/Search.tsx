import React from "react";
import TextField from "@material-ui/core/TextField";
import { useQuery } from "react-query";
import { fetcher } from "../../fetch";

const Search = () => {
  const [term, setTerm] = React.useState<string | null>("");

  const { isLoading, data } = useQuery(
    ["/talks", term],
    async () => await fetcher(`/talks?title=${term}`),
    {
      enabled: term,
    }
  );

  return (
    <div>
      <TextField
        id="searchTalk"
        label="Buscar talk"
        variant="filled"
        color="primary"
        onChange={(e) => setTerm(e.target.value)}
        value={term}
        fullWidth
      />
    </div>
  );
};

export default Search;
