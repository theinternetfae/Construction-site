import { account } from "./config";
import { ID } from "appwrite";

const user = {

    create: ({email, password, name}) => 
        account.create(
            ID.unique(),
            email,
            password,
            name,
        ),

    login: ({email, password}) => account.createEmailPasswordSession({
        email,
        password
    }),

    logout: () => account.deleteSession("current"),

    prefs: ({accent, quirk, quote, streak, themeDark}) => account.updatePrefs({
        accent,
        quirk,
        quote,
        streak,
        themeDark
    }),

    get: () => account.get(),

    createVer: (redirectUrl) => account.createEmailVerification(redirectUrl),

    updateVer: (userId, secret) => account.updateEmailVerification(userId, secret),
}

export default user;