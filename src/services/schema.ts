import { Schema } from "effect";

export class Post extends Schema.Class<Post>("Post")({
  userId: Schema.Number,
  id: Schema.Number.pipe(Schema.brand("Id")),
  title: Schema.String,
  body: Schema.String,
}) {
  static readonly Array = Schema.Array(this);
}

export type PostD = typeof Post.Type;
export type PostE = typeof Post.Encoded;
