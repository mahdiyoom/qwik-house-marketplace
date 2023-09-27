import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import axios from "axios";
import { baseUrl, fetchApi } from "~/components/utils/fetchAPI";

export default component$(() => {
  // variables
  const price = useStore({ amount: 10000 });
  const rooms = useStore({ amount: 4 });
  const baths = useStore({ amount: 2 });
  const area = useStore({ amount: 8000 });
  const purpose = useStore({ amount: "" });
  const rentFrequency = useStore({ amount: "" });
  const title = useStore({ amount: "" });
  const name = useStore({ amount: "" });
  const description = useStore({ amount: "" });
  const type = useStore({ amount: "" });
  const refurnishedStatus = useStore({ amount: "" });
  const coverPhoto = useStore({ amount: "" });
  const property = useSignal<any>([]);

  // * get the data from the api
  const gethouseList = $(async () => {
    try {
      const res = await fetchApi(`${baseUrl}/api/homes`);
      property.value = res;
    } catch (error) {
      console.log(error);
    }
  });
  useTask$(async () => {
    await gethouseList();
  });

  // todo 2:
  const handleFileChange = $(async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    try {
      const response = await axios.post(`${baseUrl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // The response will contain information about the uploaded image(s)
      // console.log("image being uploaded:", response.data);
      const imageUrl = response.data[0].url;
      coverPhoto.amount = imageUrl;
      alert("image has been uploaded!");
    } catch (error: any) {
      console.error(error.message);
    }
  });

  // todo 1:  function to handle form submit
  const handleSubmitForm = $(() => {
    const addHome = $(() => {
      const newHome = {
        data: {
          purpose: purpose.amount,
          price: price.amount,
          rentFrequency: rentFrequency.amount,
          room: rooms.amount,
          title: title.amount,
          bath: baths.amount,
          area: area.amount,
          name: name.amount,
          description: description.amount,
          type: type.amount,
          refurnishedStatus: refurnishedStatus.amount,
          uploadedImage: coverPhoto.amount,
        },
      };
      property.value = [...property.value, newHome];

      axios
        .post(`${baseUrl}/api/homes`, newHome)
        .then(
          ({ data: saveHome }) =>
            (property.value = [...property.value, saveHome])
        )
        .catch((err) => {
          console.log(err.message);
        });
    });
    addHome();
    alert("the home added successfully!");

    /*  if (
      price.amount === 0 ||
      rooms.amount === 0 ||
      baths.amount === 0 ||
      area.amount === 0 ||
      purpose.amount === "" ||
      rentFrequency.amount === "" ||
      title.amount === "" ||
      name.amount === "" ||
      description.amount === "" ||
      type.amount === "" ||
      refurnishedStatus.amount === ""
    ) {
      alert("please fill all the fields to submit!");
      return;
    } */
    /* 
    price.amount = 10000;
    rooms.amount = 4;
    baths.amount = 3;
    area.amount = 8000;
    purpose.amount = "";
    rentFrequency.amount = "";
    title.amount = "";
    name.amount = "";
    description.amount = "";
    type.amount = "";
    refurnishedStatus.amount = ""; */
  });
  return (
    <form
      class="max-w-[70%] m-auto bg-gray-200 p-10 rounded-md"
      onSubmit$={handleSubmitForm}
      preventdefault:submit
    >
      <div class="mb-6">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="user_avatar"
        >
          Upload Image
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
          onChange$={handleFileChange}
        />
        <div
          class="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="user_avatar_help"
        >
          upload your house cover photo
        </div>
      </div>

      <div class="mb-6">
        <label
          for="purpose"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          house purpose
        </label>
        <input
          type="text"
          id="purpose"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="for-rent"
          value={purpose.amount}
          onChange$={(e) => {
            purpose.amount = e?.target?.value;
          }}
        />
      </div>
      <div class="mb-6">
        <label
          for="price"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          price
        </label>
        <input
          type="number"
          id="price"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={price.amount}
          onChange$={(e) => {
            price.amount = +e?.target?.value;
          }}
        />
      </div>

      <div class="mb-6">
        <label
          for="rentFrequency"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          rent frequency
        </label>
        <input
          type="text"
          id="rentFrequency"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="monthly"
          value={rentFrequency.amount}
          onChange$={(e) => {
            rentFrequency.amount = e?.target?.value;
          }}
        />
      </div>

      <div class="mb-6">
        <label
          for="rooms"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          rooms number
        </label>
        <input
          type="number"
          id="rooms"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={rooms.amount}
          onChange$={(e) => {
            rooms.amount = +e?.target?.value;
          }}
        />
      </div>

      <div class="mb-6">
        <label
          for="title"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          title
        </label>
        <input
          type="text"
          id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={title.amount}
          onChange$={(e) => {
            title.amount = e?.target?.value;
          }}
        />
      </div>

      <div class="mb-6">
        <label
          for="baths"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          bath number
        </label>
        <input
          type="number"
          id="baths"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={baths.amount}
          onChange$={(e) => {
            baths.amount = +e?.target?.value;
          }}
        />
      </div>

      <div class="mb-6">
        <label
          for="area"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          area
        </label>
        <input
          type="number"
          id="area"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={area.amount}
          onChange$={(e) => {
            area.amount = +e?.target?.value;
          }}
        />
      </div>

      <div class="mb-6">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          name
        </label>
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={name.amount}
          onChange$={(e) => {
            name.amount = e?.target?.value;
          }}
        />
      </div>

      <div class="mb-6">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          description
        </label>
        <input
          type="text"
          id="description"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={description.amount}
          onChange$={(e) => {
            description.amount = e?.target?.value;
          }}
        />
      </div>

      <div class="mb-6">
        <label
          for="refurnishedStatus"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          refurnished status
        </label>
        <input
          type="text"
          id="refurnishedStatus"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="furnished"
          value={refurnishedStatus.amount}
          onChange$={(e) => {
            refurnishedStatus.amount = e?.target?.value;
          }}
        />
      </div>

      <div class="mb-6">
        <label
          for="type"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          house type
        </label>
        <input
          type="text"
          id="type"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="villa"
          value={type.amount}
          onChange$={(e) => {
            type.amount = e?.target?.value;
          }}
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
      >
        Submit
      </button>
    </form>
  );
});
