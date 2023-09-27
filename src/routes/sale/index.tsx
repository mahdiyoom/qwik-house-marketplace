import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { baseUrl, fetchApi } from "~/components/utils/fetchAPI";
import { Loader } from "../../components/common/Loader";
import { Property } from "~/components/common/property";
import axios from "axios";

export default component$(() => {
  const sale = useSignal([]);
  // fetching the homes for sale
  const buyHome = useResource$(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    const saleValue = await fetchApi(
      `${baseUrl}/api/homes?filters[purpose]=for-sale&populate=*`
    );
    sale.value = saleValue;
    return sale.value;
  });
  // delete a home
  const deleteHome = $((home: any) => {
    sale.value = sale.value?.filter((u: any) => u.id !== home.id);
    axios
      .delete(`${baseUrl}/api/homes/${home.id}`)
      .catch((err) => console.log(err.message));
  });
  return (
    <>
      <h1 class="text-3xl m-4 font-bold">Properties for Sale</h1>
      <Resource
        value={buyHome}
        onPending={() => <Loader />}
        onResolved={(sale) => {
          return (
            <div class="flex flex-wrap">
              {sale?.map((property: any) => (
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
