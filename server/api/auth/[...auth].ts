import {auth} from "../../utils/auth";

export default defineEventHandler(e => {
    return auth.handler(toWebRequest(e))
})
