import React from "react";
import { render } from "@testing-library/react";
import NewsTile from "./newsTile";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

const news = {
  id: "1-21",
  title:
    "I'll never go THERE again!' said Alice indignantly. 'Ah! then yours wasn't a.",
  user: {
    id: 1,
    profileImage: "https://lorempixel.com/640/480/?50808",
    username: "test",
  },
  likes: 1,
  comments: 14,
  preview:
    "Gryphon whispered in a more subdued tone, and she heard a little feeble, squeaking voice, ('That's Bill,' thought Alice,) 'Well, I never was so small as this is May it won't be raving mad--at least no",
  isCutted: true,
  createdAt: "2020-11-28T18:16:41.000000Z",
  updatedAt: "2020-11-28T18:16:41.000000Z",
};

test("should render without crash", () => {
  render(<NewsTile news={news} />);
});

test("should display news", () => {
  const { getByText } = render(<NewsTile news={news} />);

  expect(getByText(news.title)).toBeInTheDocument();
  expect(getByText(news.preview + "...")).toBeInTheDocument();
  expect(getByText(news.user.username)).toBeInTheDocument();
});
