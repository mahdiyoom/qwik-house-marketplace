import {
  component$,
  useSignal,
  $,
  useTask$,
  noSerialize,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import axios from "axios";
import { fetchApi } from "~/components/utils/fetchAPI";
export default component$(() => {
  const house = useSignal<any[]>([]);

  // get the house
  const gethouseList = $(async () => {
    try {
      const res = await fetchApi("http://localhost:1337/api/homes");
      house.value = res;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  });
  useTask$(async () => {
    await gethouseList();
  });

  return (
    <>
      <div class="flex flex-wrap  mt-5 gap-4 justify-center cursor-pointer">
        {house.value?.map((home) => (
          <p key={home.id}>{home.attributes.title}</p>
        ))}
      </div>
    </>
  );
});
