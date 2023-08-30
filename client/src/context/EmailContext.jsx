import { createContext, useContext, useState } from "react";

const EmailContext = createContext();

const EmailProvider = ({ children }) => {
  const [emailContext, setEmailContext] = useState(null);

  const setEmailEvent = (email) => {
    setEmailContext(email);
  };

  const contextData = { emailContext, setEmailEvent };

  return (
    <EmailContext.Provider value={contextData}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);

export default EmailProvider;
