import { createStore } from "redux"
import rootReducer from "./reducers"

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)