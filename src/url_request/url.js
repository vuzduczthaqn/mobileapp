const url='http://10.0.60.156:8989/'
const socket="ws://192.168.31.214:8989/ws"
export default{
    get_post_data_home:url+'get-post-data',
    socket_send_like_post:socket,
    save_post:url+"save-new-post",
    url:url,
    get_data_search:url+'seach-data'
}