import { $, component$, useSignal } from "@builder.io/qwik";
import { baseUrl, fetchApi } from "~/components/utils/fetchAPI";
import { Property } from "~/components/common/property";
import axios from "axios";
import { ErrorPage } from "~/components/common/Error/ErrorPage";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useSale = routeLoader$(async () => {
  const saleValue = await fetchApi(
    `${baseUrl}/api/homes?filters[purpose]=for-sale&populate=*&pagination[page]=1&pagination[pageSize]=3100`
  );

  return saleValue;
});

export default component$(() => {
  const saleValue = useSale();
  const sale = useSignal(saleValue.value);
  // delete a home
  const deleteHome = $((home: any) => {
    sale.value = sale.value?.filter((u: any) => u.id !== home.id);
    axios
      .delete(`${baseUrl}/api/homes/${home.id}`)
      .catch((err) => console.log(err.message));
  });
  return (
    <>
      <h1 class="lg:text-3xl text-2xl m-6 mb-8 font-bold text-center md:text-start">
        Properties for Sale
      </h1>
      {!saleValue.value && <ErrorPage />}
      <div class="flex flex-wrap items-center justify-center lg:items-start lg:justify-start">
        {sale.value?.map((property: any) => (
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
