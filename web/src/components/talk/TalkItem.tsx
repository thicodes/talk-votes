import React from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import { Flex, Box } from "rebass";
import { fetcher } from "../../fetch";
import { Card, Button } from "../ui";

type TalkItemProps = {
  talk: {
    countVotes: number;
    title: string;
    id: number;
  };
};

const TalkItem = (props: TalkItemProps) => {
  const { talk } = props;
  const { countVotes, title, id } = talk;

  const [mutateAddVote] = useMutation(
    (data: any) =>
      fetcher(`/talks/${data.id}`, {
        method: "PATCH",
        body: {
          // @ts-ignore
          countVotes: data.countVotes,
        },
      }),
    {
      onMutate: (newVote: any) => {
        const oldTalks = queryCache.getQueryData("/talks");

        // queryCache.setQueryData(["/talks", {id: }])

        queryCache.setQueryData("/talks", (old: any) =>
          old.map((oldItem: any) =>
            oldItem.id === newVote.id ? { ...oldItem, ...newVote } : oldItem
          )
        );

        return () => queryCache.setQueryData("/talks", oldTalks);
      },
      onError: (error, values, rollback) => rollback(),
    }
  );

  const addVote = (talk: any) => {
    const { id, countVotes } = talk;
    mutateAddVote({
      id,
      countVotes: countVotes + 1,
    });
  };

  return (
    <Card>
      <Flex>
        <Flex flexDirection="column">
          <Flex
            height="50px"
            justifyContent="center"
            alignItems="center"
            sx={{ fontWeight: "bold" }}
          >
            {countVotes}
          </Flex>
          <Button
            onClick={() => addVote(talk)}
            variant="contained"
            disableElevation
          >
            Votar
          </Button>
        </Flex>
        <Flex alignItems="center" pl="30px">
          {title}
        </Flex>
      </Flex>
    </Card>
  );
};

export default TalkItem;
