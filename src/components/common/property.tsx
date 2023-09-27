import { $, PropFunction, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import millify from "millify";
import { defaultImages } from "../utils/DefaultImages";
interface homeProp {
  property: any;
  onDeleteHome: PropFunction<(property: any) => void>;
}

// Create a random number between 0 and 4
const randomNumber = Math.floor(Math.random() * 4);
const randomImage = defaultImages[randomNumber];

export const Property = component$(({ property, onDeleteHome }: homeProp) => {
  return (
    <div
      key={property.id}
      class="transition ease-in delay-[0.3s] hover:scale-[1.02] "
    >
      <div class="overflow-hidden">
        <div class="flex flex-wrap max-w-[420px] p-5 pt-0 justify-start cursor-pointer">
          <div>
            <div class="h-[260px]">
              <img
                src={
                  property?.attributes?.coverPhoto?.data?.attributes?.url
                    ? property?.attributes?.coverPhoto?.data?.attributes?.url
                    : property.attributes.uploadedImage
                    ? property.attributes.uploadedImage
                    : randomImage
                }
                width={420}
                height={260}
                class="h-[260px]"
              />
            </div>

            <div class="w-full p-2">
              <div class="flex pt-2 items-center">
                <div class="pr-3 text-green-400">
                  {property?.attributes?.isVerified && (
                    <i class="fa-regular fa-circle-check"></i>
                  )}
                </div>
                <p class="font-bold text-lg">
                  AED {millify(property?.attributes?.price)}{" "}
                  {property?.attributes?.rentFrequency &&
                    `/${property?.attributes?.rentFrequency}`}
                </p>
              </div>

              <div class="flex items-center p-1 justify-between w-[250px] text-blue-400">
                {+property?.attributes?.room}
                <i class="fa-solid fa-bed"></i> | {+property?.attributes?.bath}{" "}
                <i class="fa-solid fa-bath"></i> |{" "}
                {millify(property?.attributes?.area)} sqft{" "}
                <i class="fas fa-th-large"></i>
              </div>
            </div>
          </div>

          <div class="mt-2">
            <p class="text-base mt-2 font-bold">
              {property?.attributes?.title?.length > 30
                ? `${property?.attributes?.title?.substring(0, 30)}...`
                : property?.attributes?.title?.length}
            </p>
          </div>
          <div class="mt-2 flex items-center gap-4">
            <button
              class="bg-gray-100 px-4 py-2 rounded-md font-semibold"
              onClick$={() => {
                const res = confirm("are sure to delete the home?");
                res && onDeleteHome(property);
                const response = res && onDeleteHome(property);
                response && alert(`home with id ${property.id} deleted!`);
              }}
            >
              Delete
            </button>
            <Link href={`/property/${property.id}`}>
              <button class="bg-gray-100 px-4 py-2 rounded-md font-semibold">
                More...
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
