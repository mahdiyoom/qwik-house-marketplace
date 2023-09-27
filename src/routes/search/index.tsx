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
import { SearchFilterItems } from "~/components/search/SearchFilterItems";
import axios from "axios";

export default component$(() => {
  const propertyHolder = useSignal([]);
  // state that will toggle
  const isVisible = useSignal(false);
  const purpose = useSignal("");
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
    const property = await fetchApi(`${baseUrl}/api/homes?populate=*`);
    propertyHolder.value = property;
    return propertyHolder.value;
  });

  // delete a home
  const deleteHome = $((home: any) => {
    propertyHolder.value = propertyHolder.value?.filter(
      (u: any) => u.id !== home.id
    );

    axios
      .delete(`${baseUrl}/api/homes/${home.id}`)
      .catch((err) => console.log(err.message));
  });

  // @ts-ignore
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
        <SearchFilterItems
          onBathChange={handleBathChange}
          onRoomChange={handleRoomChange}
          onPurposeChange={handlePurposeChange}
          onMinimumPriceChange={handleMinPriceChange}
          onMaximumPriceChange={handleMaxPriceChange}
          baths={baths.value}
          rooms={rooms.value}
          maximumPrice={maximumPrice.value}
          minimumPrice={minimumPrice.value}
          purpose={purpose.value}
        />
      )}
      <p class="text-3xl font-bold"></p>
      <Resource
        value={property}
        onPending={() => <Loader />}
        onResolved={(property) => (
          <>
            <div class="flex flex-wrap mt-8">
              {property
                ?.filter(
                  (item: any) =>
                    item.attributes.purpose === purpose.value &&
                    item.attributes.price <= maximumPrice.value &&
                    item.attributes.price >= minimumPrice.value &&
                    item.attributes.room >= rooms.value &&
                    item.attributes.bath >= baths.value
                )
                ?.map((pro: any) => (
                  <Property
                    key={pro.id}
                    property={pro}
                    onDeleteHome={deleteHome}
                  />
                ))}
            </div>
            {property?.filter(
              (item: any) =>
                item.attributes.purpose === purpose.value &&
                item.attributes.price <= maximumPrice.value &&
                item.attributes.price >= minimumPrice.value &&
                item.attributes.room >= rooms.value &&
                item.attributes.bath >= baths.value
            )?.length === 0 && <SearchNotFound />}
          </>
        )}
      />
    </>
  );
});
