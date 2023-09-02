import { createContext, useContext, useState } from "react";

const SearchValueContext = createContext();

const SearchValueProvider = ({ children }) => {
  const [searchValueContext, setSearchValueContext] = useState(null);

  const setSearchValueEvent = (searchValue) => {
    setSearchValueContext(searchValue);
  };

  const contextData = { searchValueContext, setSearchValueEvent };

  return (
    <SearchValueContext.Provider value={contextData}>
      {children}
    </SearchValueContext.Provider>
  );
};

export const useSearchValue = () => useContext(SearchValueContext);

export default SearchValueProvider;
