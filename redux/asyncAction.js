const fetch = require("node-fetch");

// initial state
const initialState = {
    loading: false,
    posts: [],
    error: "",
}

const fetchPostsRequested = () => {
    return {
        type: "posts/requested",
    }
}

const fetchPostsSucceeded = (posts) => {
    return {
        type: "posts/succeeded",
        payload: posts,
    }
}

const fetchPostsFailed = (error) => { 
    return {
        type: "posts/failed",
        payload: error,
    }
}

// reducer
const reducer = (state = initialState, action) => { 
    switch (action.type) { 
        case "posts/requested":
            return {
                ...state,
                loading: true,
                error: "",
            };
        case "posts/succeeded":
            return {
                ...state,
                loading: false,
                error: "",
                posts: action.payload,

            }
        case "posts/failed":
            return {
                ...state,
                loading: false,
                error: action.payload.message,
                posts: [],
            }
    }
}

// thunk function
const fetchPosts = () => { 
    // as this is a node js project we need to install node-fetch package
    // to do that run this command in your terminal `npm i node-fetch@2`
    return async (dispatch) => { 
        dispatch(fetchPostsRequested());
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
            const posts = await response.json();
            dispatch(fetchPostsSucceeded(posts));
        } catch (error) {
            dispatch(fetchPostsFailed(error));
        }
    }
}

