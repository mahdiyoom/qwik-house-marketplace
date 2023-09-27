import { routeLoader$ } from "@builder.io/qwik-city";
import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { baseUrl, fetchApi } from "~/components/utils/fetchAPI";
import { ImageSlider } from "~/components/propery-detail/ImageSlider";
import millify from "millify";

const defaultImages = [
  {
    attributes: {
      url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    },
  },
  {
    attributes: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    },
  },
  {
    attributes: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    },
  },
];

export const usePropertyId = routeLoader$(async (requestEvent) => {
  return requestEvent.params.id;
});

export default component$(() => {
  const id = usePropertyId();
  const propertyDetails = useResource$(async () => {
    const data = await fetchApi(`${baseUrl}/api/homes/${id.value}?populate=*`);
    return data;
  });
  return (
    <Resource
      value={propertyDetails}
      onPending={() => <p>loading...</p>}
      onRejected={() => <p>some thing wrong!</p>}
      onResolved={(property: any) => {
        return (
          <div class="max-w-[1080px] m-auto p-4">
            <div class="w-[80%] h-[400px] ml-auto mr-auto mt-7 mb-7">
              {property?.attributes?.images?.data ? (
                <ImageSlider photos={property?.attributes?.images?.data} />
              ) : (
                <ImageSlider photos={defaultImages} />
              )}
            </div>
            <div class="w-full p-6">
              <div class="flex pt-2 items-center justify-between">
                <div class="flex items-center">
                  <div class="pr-3 text-gray-400">
                    {" "}
                    {property?.attributes?.isVerified && (
                      <i class="fa-regular fa-circle-check"></i>
                    )}
                  </div>
                  <p class="font-bold text-lg">
                    AED {millify(+property?.attributes?.price)}
                    {property?.attributes?.rentFrequency &&
                      `/${property?.attributes?.rentFrequency}`}
                  </p>
                </div>
              </div>

              <div class="flex items-center p-1 justify-between w-[250px] text-blue-400">
                {property?.attributes?.room}
                <i class="fa-solid fa-bed"></i> | {property?.attributes?.bath}{" "}
                <i class="fa-solid fa-bath"></i> |{" "}
                {millify(+property?.attributes?.area)} sqft{" "}
                <i class="fas fa-th-large"></i>
              </div>
              <div class="mt-2">
                <p class="text-lg mb-2 font-bold">
                  {property?.attributes?.title}
                </p>
                <p class="leading-7 text-gray-600">
                  {property?.attributes?.description}
                </p>
              </div>

              <div class="flex justify-between flex-wrap">
                <div class="flex justify-between w-[480px] border-b-[1px] border-gray-100 p-3">
                  <p>Type</p>
                  <p class="font-bold">{property?.attributes?.type}</p>
                </div>

                <div class="flex justify-between w-[480px] border-b-[1px] border-gray-100 p-3">
                  <p>Purpose</p>
                  <p class="font-bold">{property?.attributes?.purpose}</p>
                </div>
              </div>
              {property?.attributes?.rurnishingStatus && (
                <div class="flex justify-between w-[480px] border-b-[1px] border-gray-100 p-3">
                  <p>Furnishing Status</p>
                  <p class="font-bold">
                    {property?.attributes?.rurnishingStatus}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
});
