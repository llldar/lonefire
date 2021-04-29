import algoliasearch from 'algoliasearch';
import { Hits, InstantSearch } from 'react-instantsearch-dom';

import { Search } from '@emotion-icons/material-outlined';

import SearchResult from './SearchResult';
import { BaseSearchBar, SearchInput } from './style';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
);

const SearchBar = (): React.ReactElement => {
  return (
    <BaseSearchBar>
      <Search size={24} />
      <InstantSearch
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
      >
        <SearchInput />
        <Hits hitComponent={SearchResult} />
      </InstantSearch>
    </BaseSearchBar>
  );
};

export default SearchBar;
