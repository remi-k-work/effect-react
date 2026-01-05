import { Layer, ManagedRuntime } from "effect";
import { Geolocation } from "@effect/platform-browser";

const MainLayer = Layer.mergeAll(Geolocation.layer);

export const RuntimeClient = ManagedRuntime.make(MainLayer);
