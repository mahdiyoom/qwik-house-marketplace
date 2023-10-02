import { $, component$, useSignal } from "@builder.io/qwik";
import { baseUrl, fetchApi } from "~/components/utils/fetchAPI";
import { Property } from "~/components/common/property";
import axios from "axios";
import { ErrorPage } from "~/components/common/Error/ErrorPage";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useRent = routeLoader$(async () => {
  const rentValue = await fetchApi(
    `${baseUrl}/api/homes?filters[purpose]=for-rent&populate=*&pagination[page]=1&pagination[pageSize]=3100`
  );
  return rentValue;
});
export default component$(() => {
  const rentValue = useRent();
  const rent = useSignal(rentValue.value);

  // delete a home

  const deleteHome = $((home: any) => {
    rent.value = rent.value?.filter((u: any) => u.id !== home.id);
    axios
      .delete(`${baseUrl}/api/homes/${home.id}`)
      .catch((err) => console.log(err.message));
  });
  return (
    <>
      <h1 class="lg:text-3xl text-2xl m-6 mb-8 font-bold text-center md:text-left">
        Properties for Rent
      </h1>
      {!rentValue.value && <ErrorPage />}
      <div class="flex flex-wrap items-center justify-center lg:items-start lg:justify-start">
        {rent.value?.map((property: any) => (
          <Property
            property={property}
            key={property.id}
            onDeleteHome={deleteHome}
          />
        ))}
      </div>
    </>
  );
});
