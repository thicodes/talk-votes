import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import TalkList from "../TalkList";

describe("Talk", () => {
  it("should list talks", async () => {
    render(<TalkList />);

    await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i));

    screen.debug();

    expect(await screen.findByText("talk 1")).toBeInTheDocument();
  });
});
