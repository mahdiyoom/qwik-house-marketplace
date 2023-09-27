import type { PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { SelectComponent } from "./SelectComponent";

// variables
const MaxOptions = [
  { name: "", value: "max-price" },
  { name: 50000, value: 50000 },
  { name: 60000, value: 60000 },
  { name: 85000, value: 85000 },
  { name: 110000, value: 110000 },
  { name: 135000, value: 135000 },
  { name: 160000, value: 160000 },
  { name: 185000, value: 185000 },
  { name: 200000, value: 200000 },
  { name: 300000, value: 300000 },
  { name: 400000, value: 400000 },
  { name: 500000, value: 500000 },
  { name: 600000, value: 600000 },
  { name: 700000, value: 700000 },
  { name: 800000, value: 800000 },
  { name: 900000, value: 900000 },
  { name: 1000000, value: 1000000 },
];

const minOptions = [
  { name: "", value: "min-price" },
  { name: 10000, value: 10000 },
  { name: 20000, value: 20000 },
  { name: 30000, value: 30000 },
  { name: 40000, value: 40000 },
  { name: 50000, value: 50000 },
  { name: 60000, value: 60000 },
  { name: 85000, value: 85000 },
];

const roomOptions = [
  { name: "", value: "rooms" },
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: 4, value: 4 },
  { name: 5, value: 5 },
  { name: 6, value: 6 },
  { name: 7, value: 7 },
  { name: 9, value: 8 },
  { name: 10, value: 10 },
];

const bathOptions = [
  { name: "", value: "baths" },
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: 4, value: 4 },
  { name: 5, value: 5 },
  { name: 6, value: 6 },
  { name: 7, value: 7 },
  { name: 9, value: 8 },
  { name: 10, value: 10 },
];

const purposeOptions = [
  { name: "", value: "purpose" },
  { name: "for-sale", value: "buy" },
  { name: "for-rent", value: "rent" },
];

interface searchFiltersProps {
  onBathChange: PropFunction<() => void>;
  onRoomChange: PropFunction<() => void>;
  onPurposeChange: PropFunction<() => void>;
  onMinimumPriceChange: PropFunction<() => void>;
  onMaximumPriceChange: PropFunction<() => void>;
  baths: number;
  rooms: number;
  maximumPrice: number;
  minimumPrice: number;
  purpose: string;
}
export const SearchFilterItems = component$(
  ({
    onBathChange,
    onRoomChange,
    onPurposeChange,
    onMaximumPriceChange,
    onMinimumPriceChange,
    baths,
    rooms,
    maximumPrice,
    minimumPrice,
    purpose,
  }: searchFiltersProps) => {
    return (
      <div class="flex bg-blue-50 p-4 justify-center mb-8">
        <div class="flex justify-center flex-wrap mb-10 gap-10 lg:flex-nowrap">
          <SelectComponent
            options={purposeOptions}
            value={purpose}
            onChange={onPurposeChange}
            placeholder="purpose"
          />

          <SelectComponent
            options={minOptions}
            value={minimumPrice}
            onChange={onMinimumPriceChange}
            placeholder="Min Price(AED)"
          />

          <SelectComponent
            options={MaxOptions}
            value={maximumPrice}
            onChange={onMaximumPriceChange}
            placeholder="Max Price(AED)"
          />

          <SelectComponent
            options={roomOptions}
            value={rooms}
            onChange={onRoomChange}
            placeholder="rooms"
          />

          <SelectComponent
            options={bathOptions}
            value={baths}
            onChange={onBathChange}
            placeholder="baths"
          />
        </div>
      </div>
    );
  }
);
