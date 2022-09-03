const fetch = require("node-fetch");
const { createStore, applyMiddleware } = require("redux");
// we are using .default as this is a node js environment
const thunk = require("redux-thunk").default;

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

// create store
// to use the thunk as our middleware we needed to install redux-thunk package
// `npm i redux-thunk`
const store = createStore(reducer, applyMiddleware(thunk));

// subscribe to the store / state changes
store.subscribe(() => { 
    console.log(store.getState());
});

// dispatch action
store.dispatch(fetchPosts());