"use client";

import { getCampers } from "@/src/lib/api";
import CamperCard from "../CamperCard/CamperCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

const initialFilters = {
     location: "",
    form: "",
    engine: "",
    transmission: ""
}

export default function CamperList() {
  const [filters, setFilters] = useState(initialFilters);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const location = String(formData.get("location") ?? "");
    const form = String(formData.get("form") ?? "");
    const engine = String(formData.get("engine") ?? '');
    const transmission = String(formData.get("transmission") ?? '');

    setFilters({
      location: location,
      form: form,
      engine: engine,
      transmission: transmission,
    });
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: async ({ pageParam }) => {
      const res = await getCampers({
        page: pageParam,
        perPage: 4,
        location: filters.location || undefined,
        form: filters.form || undefined,
        engine: filters.engine || undefined,
        transmission: filters.transmission || undefined,
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="location" />
        <h3>Filters</h3>
        <fieldset>
          <legend>Camper form</legend>
          <label>
            <input type="radio" name="form" value={"alcove"} />
            Alcove
          </label>
          <label>
            <input type="radio" name="form" value={"panel_van"} />
            Panel Van
          </label>
          <label>
            <input type="radio" name="form" value={"integrated"} />
            Integrated
          </label>
          <label>
            <input type="radio" name="form" value={"semi_integrated"} />
            Semi Integrated
          </label>
        </fieldset>
        <fieldset>
          <legend>Engine</legend>
          <label>
            <input type="radio" name="engine" value={"diesel"} />
            Diesel
          </label>
          <label>
            <input type="radio" name="engine" value={"petrol"} />
            Petrol
          </label>
          <label>
            <input type="radio" name="engine" value={"hybrid"} />
            Hybrid
          </label>
          <label>
            <input type="radio" name="engine" value={"electric"} />
            Electric
          </label>
        </fieldset>
        <fieldset>
          <legend>Transmission</legend>
          <label>
            <input type="radio" name="transmission" value={"automatic"} />
            Automatic
          </label>
          <label>
            <input type="radio" name="transmission" value={"manual"} />
            Manual
          </label>
        </fieldset>

        <button type="submit">Search</button>
        <button type="reset" onClick={()=> setFilters(initialFilters)}>Clear filters</button>
          </form>
          
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      
          <ul>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper}></CamperCard>
        ))}
      </ul>
      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading" : "Load more"}
        </button>
      )}
    </div>
  );
}
