import React, { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => "",
});

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (data: string) => void;
}

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
