import { Effect, flow } from "effect";
import { FetchHttpClient, HttpClient, HttpClientRequest } from "@effect/platform";

export class Api extends Effect.Service<Api>()("Api", {
  dependencies: [FetchHttpClient.layer],

  effect: Effect.gen(function* () {
    const baseClient = yield* HttpClient.HttpClient;

    const client = baseClient.pipe(
      HttpClient.mapRequest(flow(HttpClientRequest.prependUrl("https://jsonplaceholder.typicode.com"), HttpClientRequest.acceptJson)),
    );

    return {
      getPosts: client.get("/posts"),
      getPostById: (id: string) => client.get(`/posts/${id}`),
    };
  }),
}) {}
