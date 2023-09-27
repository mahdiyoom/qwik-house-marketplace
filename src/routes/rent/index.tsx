import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { baseUrl, fetchApi } from "~/components/utils/fetchAPI";
import { Property } from "~/components/common/property";
import { Loader } from "~/components/common/Loader";
import axios from "axios";

export default component$(() => {
  const rent = useSignal([]);
  const rentHome = useResource$(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    const rentValue = await fetchApi(
      `${baseUrl}/api/homes?filters[purpose]=for-rent&populate=*`
    );
    rent.value = rentValue;
    return rent.value;
  });

  // delete a home

  const deleteHome = $((home: any) => {
    rent.value = rent.value?.filter((u: any) => u.id !== home.id);
    axios
      .delete(`${baseUrl}/api/homes/${home.id}`)
      .catch((err) => console.log(err.message));
  });
  return (
    <>
      <h1 class="text-3xl m-4 font-bold">Properties for Rent</h1>

      <Resource
        value={rentHome}
        onPending={() => <Loader />}
        onResolved={(rent) => {
          return (
            <div class="flex flex-wrap">
              {rent?.map((property: any) => (
                <Property
                  property={property}
                  key={property.id}
                  onDeleteHome={deleteHome}
                />
              ))}
            </div>
          );
        }}
      />
    </>
  );
});
