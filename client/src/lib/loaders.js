import apiRequest from "./apiRequest"
import { defer } from "react-router-dom"

export const singlePageLoader = async ({ request, params }) => {
    const res = await apiRequest("/posts/"+params.id)
    return res.data
}

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1]

    const postPromise = apiRequest("/posts?" + query)
    return defer({
        postResponse: postPromise
    })
}

export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePosts")
    return defer({
        postResponse: postPromise,
    })
}


export const bookedPageLoader = async () => {
    const postPromise = apiRequest("/posts/bookedposts")
    return defer({
        postResponse: postPromise,
    })
}

// export const listPageLoader = async ({ request, params }) => {
//     const query = request.url.split("?")[1]

//     const res = await apiRequest("/posts?"+query)
//     return res.data
// }