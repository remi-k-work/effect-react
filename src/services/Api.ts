import { Effect, flow } from "effect";
import { FetchHttpClient, HttpClient, HttpClientRequest, HttpClientResponse } from "@effect/platform";

import { Post } from "./schema";

export class Api extends Effect.Service<Api>()("Api", {
  dependencies: [FetchHttpClient.layer],

  effect: Effect.gen(function* () {
    const baseClient = yield* HttpClient.HttpClient.pipe(Effect.map(HttpClient.filterStatusOk));

    const client = baseClient.pipe(
      HttpClient.mapRequest(flow(HttpClientRequest.prependUrl("https://jsonplaceholder.typicode.com"), HttpClientRequest.acceptJson)),
    );

    return {
      getPosts: () => client.get("/posts").pipe(Effect.flatMap(HttpClientResponse.schemaBodyJson(Post.Array))),
      getPostById: (id: number) => client.get(`/posts/${id}`).pipe(Effect.flatMap(HttpClientResponse.schemaBodyJson(Post))),
    };
  }),
}) {}
