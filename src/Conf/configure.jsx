import React from 'react'

const Configure = {

    appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),
    appwritePROJECTID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDATABASEID: String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteMENUITEM:String(import.meta.env.VITE_APPWRITE_MENU_ITEM_COLLECTION_ID),
    appwriteMENU_CATEGORY: String(import.meta.env.VITE_APPWRITE_MENU_CATEGORY_COLLECTION_ID),
    appwriteORDER: String(import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID),
    appwritePROFILE: String(import.meta.env.VITE_APPWRITE_USER_PROFILE_COLLECTION_ID),
    appwriteBUCKETID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}


export default Configure
