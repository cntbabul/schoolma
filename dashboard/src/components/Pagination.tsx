"use client"
import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number, count: number }) => {
    const router = useRouter()
    const hasPrev = page > 1
    const hasNext = page < Math.ceil(count / ITEM_PER_PAGE)
    const changePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search)
        params.set("page", newPage.toString())
        router.push(`${window.location.pathname}?${params}`)
    }

    return (
        <div className='p-4 flex items-center justify-between text-gray-500'>
            <button
                onClick={() => changePage(page - 1)}
                disabled={!hasPrev}
                className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>Prev
            </button>
            <div className='flex items-center gap-2 text-sm'>
                {Array.from(
                    { length: Math.ceil(count / ITEM_PER_PAGE) },
                    (_, index) => {
                        const PageIndex = index + 1;
                        return (
                            <button
                                key={PageIndex}
                                className={`px-2 rounded-sm ${PageIndex === page ? 'bg-lamaPurpleLight' : ''}`}
                                onClick={() => changePage(PageIndex)}
                            >
                                {PageIndex}
                            </button>
                        )
                    }
                )}
            </div>
            <button
                disabled={!hasNext}
                onClick={() => changePage(page + 1)}
                className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>Next</button>
        </div>
    )
}

export default Pagination