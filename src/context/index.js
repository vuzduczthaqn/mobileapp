import React, {createContext, useState} from 'react';
export const GlobalContext = createContext(null);
function GlobalState({children}) {
  const [showLoginScreens, setShowLoginScreens] = useState(false);
  const [showCommentScreen, setShowCommentScreen] = useState(false);
  const [user,setUser]=useState({
    userId:'',
    userName:'',
    urlAvata:'',
  });
  return (
    <GlobalContext.Provider
      value={{
        showLoginScreens,
        setShowLoginScreens,
        setShowCommentScreen,
        showCommentScreen,
        user,
        setUser
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
