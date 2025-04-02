import { Suspense } from 'react';
import SearchResult from "@/components/SearchResult/SearchResult";

const SearchPage = () => {
    return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchResult />
    </Suspense>
  );
}

export default SearchPage;