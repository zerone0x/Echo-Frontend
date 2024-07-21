import React, { createContext, useContext, useEffect, useState } from "react";

const PublishTypeContext = createContext<PublishTypeContextType>({
  publishType: {},
  setPublishType: () => {},
});

interface PublishTypeContextType {
  publishType: any;
  setPublishType: (data: any) => void;
}

export const PublishProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [publishType, setPublishType] = useState({});

  return (
    <PublishTypeContext.Provider value={{ publishType, setPublishType }}>
      {children}
    </PublishTypeContext.Provider>
  );
};

export const usePublishType = () => useContext(PublishTypeContext);
