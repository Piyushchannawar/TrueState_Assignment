import React, { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function MultiSelect({ label, options, value, onChange, placeholder }) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? options
      : options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-gray-600">{label}</label>

      <div className="relative">
        <Combobox value={value} onChange={onChange} multiple>
          <div className="relative">
            <Combobox.Input
              className="w-full border rounded-md py-2 px-3 bg-white focus:outline-none cursor-pointer"
              placeholder={placeholder}
              displayValue={() => value.join(", ")}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Combobox.Button className="absolute inset-y-0 right-2 flex items-center">
              <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-40 mt-1 w-full bg-white border rounded-md shadow-lg max-h-52 overflow-auto">
              {filtered.map((opt) => (
                <Combobox.Option
                  key={opt}
                  value={opt}
                  className={({ active }) =>
                    `cursor-pointer select-none px-3 py-2 ${
                      active ? "bg-indigo-100" : ""
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex justify-between">
                      <span>{opt}</span>
                      {selected && (
                        <CheckIcon className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </div>
  );
}

export default function Filters({ filters, setFilters }) {
  const regionOptions = ["North", "South", "East", "West", "Central"];
  const genderOptions = ["Male", "Female", "Other"];
  const categoryOptions = ["Clothing", "Beauty", "Electronics", "Grocery", "Home"];
  const tagOptions = ["Organic", "Skincare", "Discounted", "New", "Popular"];
  const paymentOptions = ["UPI", "Cash", "Card", "NetBanking", "Wallet"];

  const ageRanges = [
    { label: "All", min: "", max: "" },
    { label: "18-25", min: 18, max: 25 },
    { label: "26-35", min: 26, max: 35 },
    { label: "36-50", min: 36, max: 50 },
    { label: "50+", min: 51, max: 120 },
  ];

  const [selectedRegions, setSelectedRegions] = useState(filters.region);
  const [selectedGenders, setSelectedGenders] = useState(filters.gender);
  const [selectedCategories, setSelectedCategories] = useState(filters.category);
  const [selectedTags, setSelectedTags] = useState(filters.tags);
  const [selectedPayments, setSelectedPayments] = useState(filters.payment);
  const [age, setAge] = useState("All");

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      region: selectedRegions,
      gender: selectedGenders,
      category: selectedCategories,
      tags: selectedTags,
      payment: selectedPayments,
      page: 1,
    }));
  }, [selectedRegions, selectedGenders, selectedCategories, selectedTags, selectedPayments]);

  useEffect(() => {
    const a = ageRanges.find((x) => x.label === age);
    setFilters((prev) => ({
      ...prev,
      minAge: a.min,
      maxAge: a.max,
      page: 1,
    }));
  }, [age]);

  const resetFilters = () => {
    setSelectedRegions([]);
    setSelectedGenders([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedPayments([]);
    setAge("All");

    setFilters({
      search: "",
      sortBy: "",
      page: 1,
      limit: 10,
      region: [],
      gender: [],
      category: [],
      tags: [],
      payment: [],
      minAge: "",
      maxAge: "",
    });
  };

return (
  <div className="bg-white p-4 rounded shadow-sm mb-4">

    <div className="grid grid-cols-7 gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1 invisible">Reset</label>

        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center py-2 border rounded-md hover:bg-gray-100 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 9.75a7.5 7.5 0 0112.495-5.67M4.5 9.75H9m-4.5 0V5.25m15 9a7.5 7.5 0 01-12.495 5.67M19.5 14.25H15m4.5 0v4.5"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Customer Region</label>
        <MultiSelect options={regionOptions} value={selectedRegions} onChange={setSelectedRegions} placeholder="Region"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Gender</label>
        <MultiSelect options={genderOptions} value={selectedGenders} onChange={setSelectedGenders} placeholder="Gender" />
      </div>

      {/* AGE RANGE */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Age Range</label>
        <select
          className="border rounded-md py-2 px-3 bg-white cursor-pointer"
          value={age} onChange={(e) => setAge(e.target.value)}
        >
          {ageRanges.map((a) => (
            <option key={a.label}>{a.label}</option>
          ))}
        </select>
      </div>

      {/* CATEGORY */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Product Category</label>
        <MultiSelect options={categoryOptions} value={selectedCategories} onChange={setSelectedCategories} placeholder="Category" />
      </div>

      {/* TAGS */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Tags</label>
        <MultiSelect options={tagOptions} value={selectedTags} onChange={setSelectedTags} placeholder="Tags" />
      </div>

      {/* PAYMENT */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Payment Method</label>
        <MultiSelect options={paymentOptions} value={selectedPayments} onChange={setSelectedPayments} placeholder="Payment"/>
      </div>

    </div>
  </div>
);


}
