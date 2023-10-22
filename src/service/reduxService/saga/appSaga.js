import { put } from "redux-saga/effects";

export default function *(action){
    console.log("app saga action",action);
    yield put({type:'change_app_mode_sucess',payload:action.payload})
}