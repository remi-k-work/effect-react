import { Context, Effect } from "effect";

export class FormData extends Context.Tag("FormData")<FormData, globalThis.FormData>() {
  static readonly get = (name: string) =>
    this.pipe(
      Effect.flatMap((formData) =>
        Effect.fromNullable(
          // 👇 `formData` is the actual `FormData` web API inside the service
          formData.get(name)?.toString(),
        ),
      ),
    );
}
