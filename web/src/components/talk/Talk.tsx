import React from "react";
import Button from "@material-ui/core/Button";
import { Box } from "rebass";
import TalkList from "./TalkList";
import Search from "./Search";
import TalkCreateModal from "./TalkCreateModal";
import { Container } from "../ui";

const Talk = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Container>
        <Box pb="20px">
          <Search />
        </Box>
        <Box pb="40px">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Adicionar Talk
          </Button>
        </Box>

        <TalkCreateModal open={open} onClose={() => setOpen(false)} />
        <TalkList />
      </Container>
    </>
  );
};

export default Talk;
