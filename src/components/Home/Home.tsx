import { $, component$, useSignal } from "@builder.io/qwik";
import { Banner } from "./Banner";
import { Property } from "../common/property";
import axios from "axios";
import { baseUrl } from "../utils/fetchAPI";
import { ErrorPage } from "../common/Error/ErrorPage";
import { useRent, useSale } from "~/routes";

export const Home = component$(() => {
  const rentValue = useRent();
  const saleValue = useSale();
  const rent = useSignal(rentValue.value);
  const sale = useSignal(saleValue.value);

  // delete a home
  const deleteHome = $((home: any) => {
    rent.value = rent.value?.filter((u: any) => u.id !== home.id);
    sale.value = sale.value?.filter((u: any) => u.id !== home.id);
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
    </div>
  );
});
