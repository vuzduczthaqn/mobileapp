import CryptoJS from "crypto-js";
export default function encryptPassword(passWord){
    const encodePass = CryptoJS.SHA256(passWord);
  return encodePass.toString();
}