import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <>
      <div class="text-center p-5 text-gray-600 border-t border-gray-100">
        © 2021 Realtor, Inc.
      </div>
    </>
  );
});
