import React, { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => "",
});

interface SearchContextType {
  searchQuery: any;
  setSearchQuery: (data: any) => void;
}

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
