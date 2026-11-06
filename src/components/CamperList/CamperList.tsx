'use client'

import { getCampers } from "@/src/lib/api"
import CamperCard from "../CamperCard/CamperCard";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function CamperList() {

    const { data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({     
      queryKey: ['campers'],
      queryFn: async ({pageParam}) => {
          const res = await getCampers({page: pageParam, perPage: 4 })
          return res.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
      }
  })

    const campers = data?.pages.flatMap((page) => page.campers) ?? []
    
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong</p>}
            <ul>
                {campers.map((camper) => (
                    <CamperCard key={camper.id} camper={camper}></CamperCard>
                ))}
            </ul>
            {hasNextPage && <button type="button" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? "Loading" : "Load more"}</button>}
</div>
    )
}