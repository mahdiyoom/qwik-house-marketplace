import { component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { Home } from "~/components/Home/Home";

// Home route

export default component$(() => {
  return (
    <>
      <Home />
    </>
  );
});
export const head: DocumentHead = {
  title: "Real State",
  meta: [
    {
      name: "description",
      content:
        "website to search house for rent and sale throughtout the world!",
    },
  ],
};
