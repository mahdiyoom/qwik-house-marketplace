import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface bannerProps {
  purpose: string;
  imageUrl: string;
  title1: string;
  title2: string;
  desc1: string;
  desc2: string;
  linkName: string;
  buttonText: string;
}

export const Banner = component$(
  ({
    purpose,
    imageUrl,
    title1,
    title2,
    desc1,
    desc2,
    linkName,
    buttonText,
  }: bannerProps) => {
    return (
      <div class="flex lg:justify-center items-center flex-wrap  m-10 gap-1 lg:gap-3">
        <img src={imageUrl} width={500} height={300} alt="banner" />
        <div class="p-5">
          <p class="text-gray-500 text-[14px] lg:text-base lg:font-medium  mb-1">
            {purpose}
          </p>
          <p class="text-xl md:text-[30px] font-bold leading-10">
            {title1}
            <br />
            {title2}
          </p>
          <p class="text-base md:text-[18px] pt-3 pb-3 text-gray-700 mb-2">
            {desc1}
            <br />
            {desc2}
          </p>
          <Link
            href={linkName}
            class="text-base md:text-[18px] lg:text-[20px] bg-gray-100 p-2 rounded-sm
          hover:bg-gray-200 font-semibold"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    );
  }
);
