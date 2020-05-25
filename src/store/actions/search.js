import {URL_API} from "../../constants";
import {
    SEARCH_LIST_FETCH_ERROR,
    SEARCH_LIST_FETCH_START,
    SEARCH_LIST_FETCH_SUCCESS, SEARCH_LIST_SORT_KEY,
    SEARCH_OPTION_SORT_CHANGE
} from "./actionTypes";

export function searchListFetch({event, searchValue, searchSort, currentPage}) {
    return async dispatch => {
        if(event) {
            event.preventDefault();
        }

        dispatch(searchListFetchStart());

        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        // const query = (typeof params === 'object' && params.query) ? params.query : this.state.searchInput.value;
        // const sort = (typeof params === 'object' && params.sort) ? params.sort : this.state.searchInput.sort;
        // const page = (typeof params === 'object' && params.page) ? params.page : this.state.currentPage;
        const query = searchValue;
        const sort = searchSort;
        const page = currentPage;

        fetch(`${URL_API}rutracker?username=${username}&password=${password}&query=${query}&sort=${sort}&page=${page}`)
            .then(res => res.text())
            .then(res => {
                const responseList = JSON.parse(res);

                console.log(responseList);

                dispatch(searchListFetchSuccess(responseList));
            })
            .catch(error => {
                dispatch(searchListFetchError(error));
            })
    }
}

export function searchListFetchStart() {
    return {
        type: SEARCH_LIST_FETCH_START
    }
}

export function searchListFetchSuccess(searchList) {
    return {
        type: SEARCH_LIST_FETCH_SUCCESS,
        searchList
    }
}

export function searchListFetchError(error) {
    return {
        type: SEARCH_LIST_FETCH_ERROR,
        error
    }
}

export function searchOptionSortChange(value) {
    return {
        type: SEARCH_OPTION_SORT_CHANGE,
        value
    }
}

export function searchListSortKey(key) {
    return {
        type: SEARCH_LIST_SORT_KEY,
        key
    }
}