import { component$ } from "@builder.io/qwik";
import noResult from "../../../public/assets/noresult.svg";
export const SearchNotFound = component$(() => {
  return (
    <div class="flex justify-center items-center flex-col gap-2 ">
      <img src={noResult} alt="no result" width={200} height={200} />
      <p class="text-xl mt-3">
        No Result Found! <i class="fa-solid fa-face-tired fa-bounce"></i>
      </p>
    </div>
  );
});
