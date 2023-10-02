import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Home } from "~/components/Home/Home";
import { baseUrl, fetchApi } from "~/components/utils/fetchAPI";

export const useSale = routeLoader$(async () => {
  const saleValue = await fetchApi(
    `${baseUrl}/api/homes?filters[purpose]=for-sale&populate=*`
  );

  return saleValue;
});

export const useRent = routeLoader$(async () => {
  const rentValue = await fetchApi(
    `${baseUrl}/api/homes?filters[purpose]=for-rent&populate=*`
  );
  return rentValue;
});

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
