import React from "react";
import { useQuery } from "react-query";
import { Box } from "rebass";
import { fetcher } from "../../fetch";
import TalkItem from "./TalkItem";

const fetchList = async () => await fetcher("/talks");

const TalkList = () => {
  const { isLoading, data } = useQuery("/talks", fetchList);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return data.map((talk: any) => {
    const { id } = talk;
    return (
      <Box pb="25px" key={id}>
        <TalkItem talk={talk} />
      </Box>
    );
  });
};

export default TalkList;
