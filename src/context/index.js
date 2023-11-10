import React, {createContext, useState} from 'react';
export const GlobalContext = createContext(null);
function GlobalState({children}) {
  const [showLoginScreens, setShowLoginScreens] = useState(false);
  const [showCommentScreen, setShowCommentScreen] = useState(false);
  const [showPostSettting, setShowPostSettting] = useState({
    isShow:false,
    userId:'',
    postId:'',
    userCreatePostId:''
  });
  const [user,setUser]=useState({
    userId:'',
    userName:'',
    urlAvata:'',
    fullName:'',
    describe:'',
    email:''
  });
  const [serviceSocket,setServiceSocket]=useState();
  const [postComment,setPostComment]=useState({
    userIdCreatePost:'',
    postId:''
  });
  const [notificationScreenIsFocus,setNoificationScreenIsFocus]=useState({
    isFocus:'',
    amountNotification:'',
  });
  const [notification,setNoification]=useState({
    notificationId:'',
    postId: '',
    urlAvatarUser: '',
    fullName: '',
    type: '',
    isRead: '',
    timeNotification: '',
  });
  const [amountComment,setAmountComment]=useState();
  return (
    <GlobalContext.Provider
      value={{
        showLoginScreens,
        setShowLoginScreens,
        setShowCommentScreen,
        showCommentScreen,
        user,
        setUser,
        postComment,setPostComment,
        amountComment,setAmountComment,
        serviceSocket,setServiceSocket,
        notificationScreenIsFocus,setNoificationScreenIsFocus,
        showPostSettting, setShowPostSettting,
        notification,setNoification
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
