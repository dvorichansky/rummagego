import {
    SEARCH_CHANGE_VALUE,
    SEARCH_LIST_FETCH_ERROR,
    SEARCH_LIST_FETCH_START,
    SEARCH_LIST_FETCH_SUCCESS, SEARCH_LIST_SORT_KEY, SEARCH_OPTION_SORT_CHANGE
} from "../actions/actionTypes";
import {SORT_ASCENDING, SORT_DESCENDING} from "../../containers/Search/SearchTypes/SearchTypes";

const initialState = {
    // searchInput: {
    //     type: 'text',
    //     name: 'query',
    //     placeholder: 'Введите запрос',
    //     value: '',
    //     /**
    //      * Sort variant:
    //      * '1' - registered (default); '2' - category; '4' - downloads; '7' - size; '10' - seeds; '11' - leeches
    //      */
    //     sort: '1',
    // },

    searchValue: '',
    searchSort: '1',
    searchList: [],
    searchListSort: {
        /**
         * type: 'DESCENDING', 'ASCENDING'
         */
    },
    currentPage: 1,
    loading: false
};

export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        case SEARCH_CHANGE_VALUE:
            return {
                ...state,
                searchValue: action.payload
            };
        case SEARCH_LIST_FETCH_START:
            return {
                ...state,
                loading: true
            };
        case SEARCH_LIST_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                searchList: action.searchList
            };
        case SEARCH_LIST_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case SEARCH_OPTION_SORT_CHANGE:
            return {
                ...state,
                searchSort: action.value
            };
        case SEARCH_LIST_SORT_KEY:
            const searchListSort = {};
            const sortList = state.searchList;
            const key = action.key;

            if (state.searchListSort[key] === SORT_DESCENDING) {
                searchListSort[key] = SORT_ASCENDING;
                sortList.sort((a, b) => a[key] > b[key] ? 1 : -1);
            } else {
                searchListSort[action.key] = SORT_DESCENDING;
                sortList.sort((a, b) => a[key] < b[key] ? 1 : -1);
            }

            return {
                ...state,
                searchList: sortList,
                searchListSort
            };
        default:
            return state
    }
};