import React, {createContext, useState} from 'react';
export const GlobalContext = createContext(null);
function GlobalState({children}) {
  const [showLoginScreens, setShowLoginScreens] = useState(false);
  const [showCommentScreen, setShowCommentScreen] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        showLoginScreens,
        setShowLoginScreens,
        setShowCommentScreen,
        showCommentScreen,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
