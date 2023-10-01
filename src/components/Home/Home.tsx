import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { Banner } from "./Banner";
// import { usePropertyForRentDetails, usePropertyForSaleDetails } from "~/routes";
import { Property } from "../common/property";
import axios from "axios";
import { baseUrl, fetchApi } from "../utils/fetchAPI";
import { Loader } from "../common/Loader";
import { ErrorPage } from "../common/Error/ErrorPage";

export const Home = component$(() => {
  const rent = useStore({ amount: [] });
  const sale = useStore({ amount: [] });

  const rentHome = useResource$(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    const rentValue = await fetchApi(
      `${baseUrl}/api/homes?filters[purpose]=for-rent&populate=*`
    );
    rent.amount = rentValue;
    return rent.amount;
  });

  const buyHome = useResource$(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    const saleValue = await fetchApi(
      `${baseUrl}/api/homes?filters[purpose]=for-sale&populate=*`
    );
    sale.amount = saleValue;
    return sale.amount;
  });

  // delete a home
  const deleteHome = $((home: any) => {
    rent.amount = rent?.amount?.filter((u: any) => u.id !== home.id);
    sale.amount = sale?.amount?.filter((u: any) => u.id !== home.id);
    axios
      .delete(`${baseUrl}/api/homes/${home.id}`)
      .catch((err) => console.log(err.message));
  });

  return (
    <div>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/rent"
        imageUrl="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Resource
        value={rentHome}
        onPending={() => <Loader />}
        onRejected={() => <ErrorPage />}
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

      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy and Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/sale"
        imageUrl="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Resource
        value={buyHome}
        onPending={() => <Loader />}
        onRejected={() => <ErrorPage />}
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
    </div>
  );
});
