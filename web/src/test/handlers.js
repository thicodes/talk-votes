import { rest } from "msw";

// "talks": [
//   {
//     "id": 1,
//     "title": "teste",
//     "countVotes": 10
//   },
//   {
//     "countVotes": 15,
//     "title": "dasdasd",
//     "id": 2
//   },
//   {
//     "title": "asdasdasdasd",
//     "countVotes": 0,
//     "id": 3
//   },
//   {
//     "title": "QWEQWE",
//     "countVotes": 0,
//     "id": 4
//   }
// ],

export const handlers = [
  rest.get("http://localhost:4000/talks", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: "talk 1",
          countVotes: 1,
        },
        {
          id: 2,
          title: "talk 2",
          countVotes: 4,
        },
      ])
    );
  }),
];
