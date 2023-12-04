// const url='http://192.168.31.214:8989/'
// const socket="ws://192.168.31.214:8989/ws"
const url='http://192.168.29.148:8989/'
const socket="ws://192.168.29.148:8989/ws"
export default{
    get_post_data_home:url+'get-post-data',
    socket_send_like_post:socket,
    save_post:url+"save-new-post",
    url:url,
    get_data_search_user:url+'search-user',
    login:url+'login-username',
    getImage:url+'get-list-image',
    get_profile:url+'get-profile',
    get_list_post_profile:url+'get-list-post-profile',
    get_list_comment:url+'get-comment',
    get_list_notification:url+'get-list-notification',
    get_list_receiver_friend:url+'get-list-receiver-friend',
    get_list_friend:url+'get-list-friend',
    get_list_sender_friend:url+'get-list-sender-friend',
    register_account:url+'register-account',
    save_post_no_img:url+'save-new-post-no-img',
    get_post_detail:url+'get-post-detail',
    get_infor:url+'get-infor',
    updateProfile:url+'update-profile',
    updateAvatar:url+'update-avatar',
    get_list_chat_user:url+'get-list-message',
    get_list_chat_history:url+"get-list-history-conversation",
    delete_post:url+"delete-post",
    get_post_setting:url+"get-post-setting",
    update_post:url+"update-post",
    send_invitation:url+"send-invitation",
    delete_friend:url+"delete-friend",
    accept_invitation:url+"accept-invitation"
    
}