import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { Loader } from "~/components/common/Loader";
import { SearchNotFound } from "~/components/common/SearchNotFound";
import { Property } from "~/components/common/property";
import { baseUrl, fetchApi } from "~/components/utils/fetchAPI";
import { minOptions } from "~/components/utils/filterData";
import { MaxOptions } from "~/components/utils/filterData";
import { roomOptions } from "~/components/utils/filterData";
import { bathOptions } from "~/components/utils/filterData";
import { purposeOptions } from "~/components/utils/filterData";
import axios from "axios";
import { SelectComponent } from "~/components/search/SelectComponent";
import { ErrorPage } from "~/components/common/Error/ErrorPage";

// variables

export default component$(() => {
  const propertyHolder = useSignal([]);
  // state that will toggle
  const isVisible = useSignal(false);
  const purpose = useSignal("for-sale");
  const minimumPrice = useSignal(10000);
  const maximumPrice = useSignal(1000000);
  const rooms = useSignal(3);
  const baths = useSignal(4);

  const handlePurposeChange = $((e: any) => {
    purpose.value = e.target.value;
  });
  const handleMinPriceChange = $((e: any) => {
    minimumPrice.value = e.target.value;
  });
  const handleMaxPriceChange = $((e: any) => {
    maximumPrice.value = e.target.value;
  });
  const handleRoomChange = $((e: any) => {
    rooms.value = e.target.value;
  });
  const handleBathChange = $((e: any): void => {
    baths.value = e.target.value;
  });

  const property = useResource$(async ({ track, cleanup }) => {
    track(() => {
      purpose.value;
    });
    track(() => {
      maximumPrice.value;
    });
    track(() => {
      minimumPrice.value;
    });
    track(() => {
      rooms.value;
    });
    track(() => {
      baths.value;
    });
    const controller = new AbortController();
    cleanup(() => controller.abort());
    const property = await fetchApi(
      `${baseUrl}/api/homes?filters[purpose]=${purpose.value}&populate=*&pagination[page]=1&pagination[pageSize]=3100`
    );
    propertyHolder.value = property;
    return propertyHolder.value;
  });

  // delete a home
  const deleteHome = $((home: any) => {
    propertyHolder.value = propertyHolder.value.filter(
      (u: any) => u.id !== home.id
    );

    axios
      .delete(`${baseUrl}/api/homes/${home.id}`)
      .catch((err) => console.log(err.message));
  });

  return (
    <>
      <div
        class="flex cursor-pointer bg-blue-50 border-b-[1px] border-b-gray-300 p-2 font-semibold text-lg justify-center items-center"
        onClick$={() => (isVisible.value = !isVisible.value)}
      >
        <p class="font-bold text-lg">Search Property By Filters</p>

        <i class="fa-solid fa-arrow-down-wide-short fa-bounce pl-2 w-7"></i>
      </div>

      {isVisible.value && (
        <div class="flex bg-blue-50 p-4 justify-center mb-8">
          <div class="flex justify-center flex-wrap mb-10 gap-10 lg:flex-nowrap">
            <SelectComponent
              options={purposeOptions}
              value={purpose.value}
              onChange={handlePurposeChange}
              placeholder="purpose"
            />

            <SelectComponent
              options={minOptions}
              value={minimumPrice.value}
              onChange={handleMinPriceChange}
              placeholder="Min Price(AED)"
            />

            <SelectComponent
              options={MaxOptions}
              value={maximumPrice.value}
              onChange={handleMaxPriceChange}
              placeholder="Max Price(AED)"
            />

            <SelectComponent
              options={roomOptions}
              value={rooms.value}
              onChange={handleRoomChange}
              placeholder="rooms"
            />

            <SelectComponent
              options={bathOptions}
              value={baths.value}
              onChange={handleBathChange}
              placeholder="baths"
            />
          </div>
        </div>
      )}
      <p class="text-3xl font-bold"></p>
      <Resource
        value={property}
        onPending={() => <Loader />}
        onRejected={() => <ErrorPage />}
        onResolved={(property) => (
          <>
            <div class="flex flex-wrap mt-8 items-center justify-center lg:items-start lg:justify-start">
              {property
                .filter(
                  (item: any) =>
                    item.attributes.purpose === purpose.value &&
                    item.attributes.price <= maximumPrice.value &&
                    item.attributes.price >= minimumPrice.value &&
                    item.attributes.room >= rooms.value &&
                    item.attributes.bath >= baths.value
                )
                .map((pro: any) => (
                  <Property
                    key={pro.id}
                    property={pro}
                    onDeleteHome={deleteHome}
                  />
                ))}
            </div>
            {property.filter(
              (item: any) =>
                item.attributes.purpose === purpose.value &&
                item.attributes.price <= maximumPrice.value &&
                item.attributes.price >= minimumPrice.value &&
                item.attributes.room >= rooms.value &&
                item.attributes.bath >= baths.value
            ).length === 0 && <SearchNotFound />}
          </>
        )}
      />
    </>
  );
});
