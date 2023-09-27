import { routeLoader$ } from "@builder.io/qwik-city";
import {
  $,
  component$,
  noSerialize,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

export const usePropertyId = routeLoader$(async (requestEvent) => {
  return requestEvent.params.id;
});

export default component$(() => {
  const house = useSignal<any[]>([]);
  // get the house
  const gethouseList = $(async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  });
  useTask$(async () => {
    await gethouseList();
  });
  const id = usePropertyId();
  return <div></div>;
});
