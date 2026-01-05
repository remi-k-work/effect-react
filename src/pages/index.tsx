import { Effect, Match, Schema } from "effect";
import { Api } from "../services/Api";
import { RuntimeServer } from "../services/RuntimeServer";

import Posts from "../components/Posts";
import { Post } from "../services/schema";
import Location from "../components/Location";
import Form from "../components/Form";

const main = Effect.gen(function* () {
  const api = yield* Api;

  const posts = yield* api.getPosts();
  return yield* Schema.encode(Post.Array)(posts);
});

export default async function HomePage() {
  return (
    <>
      <title>Index</title>
      <Location />
      <Form />
      {await RuntimeServer.runPromise(
        main.pipe(
          Effect.match({
            onFailure: Match.valueTags({
              ParseError: (error) => <span>ParseError</span>,
              RequestError: (error) => <span>RequestError</span>,
              ResponseError: (error) => <span>ResponseError</span>,
            }),
            onSuccess: (posts) => <Posts posts={posts} />,
          }),
        ),
      )}
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
