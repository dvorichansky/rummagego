import React from 'react';
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import queryString from "query-string";
import SearchTable from "../../components/SearchTable/SearchTable";
import './Search.scss';
import SearchPagination from "./SearchPagination/SearchPagination";
import {URL_API} from "../../constants";
import {connect} from 'react-redux';
import {SEARCH_CHANGE_VALUE} from "../../store/actions/actionTypes";
import {searchListFetch, searchOptionSortChange} from "../../store/actions/search";

class Search extends React.Component {

    // static contextType = LoaderContext;

    constructor(props) {
        super(props);
        // this.state = {
        //
        // };

        this.paginationHandler = this.paginationHandler.bind(this)
    }

    inputSearchChangeHandler = event => {
        // const searchInput = {...this.state.searchInput};
        //
        // searchInput.value = event.target.value;
        //
        // this.setState({
        //     searchInput
        // })


    };

    async searchRutrackerAPI(params) {
        this.context.setLoaderStatus(true);

        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        const query = (typeof params === 'object' && params.query) ? params.query : this.state.searchInput.value;
        const sort = (typeof params === 'object' && params.sort) ? params.sort : this.state.searchInput.sort;
        const page = (typeof params === 'object' && params.page) ? params.page : this.state.currentPage;

        return fetch(`${URL_API}rutracker?username=${username}&password=${password}&query=${query}&sort=${sort}&page=${page}`)
            .then(res => res.text())
            .then(res => {
                const responseObject = JSON.parse(res);
                console.log(responseObject);
                this.context.setLoaderStatus(false);
                return responseObject;
            });
    }

    updateSearchQueryParams({query = this.state.searchInput.value, sort = this.state.searchInput.sort, page = this.state.currentPage}) {
        // const parsed = queryString.parse(this.props.history.location.search);
        //
        // parsed.query = query;
        // parsed.sort = sort;
        // parsed.page = page;
        //
        // const stringified = queryString.stringify(parsed);
        // this.props.history.push({
        //     search: stringified
        // });
    }

    async searchHandler(event) {
        // if (event) {
        //     event.preventDefault();
        // }
        //
        // if (this.state.searchInput.value !== '') {
        //     this.updateSearchQueryParams({query: this.state.searchInput.value});
        //
        //     const searchList = await this.searchRutrackerAPI();
        //     this.setState({
        //         searchList
        //     });
        // }
    };

    sortSearchList = (key) => {
        // const searchListSort = {};
        // const sortList = this.props.searchList;
        //
        // if (this.props.searchListSort[key] === SORT_DESCENDING) {
        //     searchListSort[key] = SORT_ASCENDING;
        //     sortList.sort((a, b) => a[key] > b[key] ? 1 : -1);
        // } else {
        //     searchListSort[key] = SORT_DESCENDING;
        //     sortList.sort((a, b) => a[key] < b[key] ? 1 : -1);
        // }
        //
        // this.setState({
        //     searchList: sortList,
        //     searchListSort
        // });
    };

    async searchOptionSortHandler(event) {
        // const searchInput = {...this.state.searchInput};
        // searchInput.sort = event.target.value;
        //
        // if (this.state.searchInput.value !== '') {
        //     this.updateSearchQueryParams({sort: searchInput.sort});
        //
        //     const searchList = await this.searchRutrackerAPI({sort: searchInput.sort});
        //     this.setState({
        //         searchInput,
        //         searchList
        //     })
        // }
        //
        // this.setState({
        //     searchInput
        // })
    }

    async paginationHandler(action) {
        // let page;
        // switch (action.type) {
        //     case PAGE_NEXT:
        //         page = this.state.currentPage + 1;
        //         break;
        //     case PAGE_PREV:
        //         page = this.state.currentPage - 1;
        //         break;
        //     default:
        //         return;
        //         break;
        // }
        //
        // this.updateSearchQueryParams({page});
        //
        // const searchList = await this.searchRutrackerAPI({page});
        // this.setState({
        //     searchList,
        //     currentPage: page
        // });
    }

    render() {

        return (
            <div className={"search-wrapper w-100"}>

                <div className="search-header">
                    <div className="container pt-5 pb-5 text-white">
                        <Title value={"Поиск"}/>

                        <form className="mb-3">
                            <div className={"d-flex mb-3"}>
                                <Input
                                    type={'text'}
                                    className={'m-0 flex-grow-1'}
                                    classNameInput={'w-100 border-right-radius-0'}
                                    size={"lg"}
                                    name={'query'}
                                    placeholder={'Введите запрос'}
                                    value={this.props.searchValue}
                                    onChange={(event) => this.props.searchChangeValue(event.target.value)}
                                />
                                <button
                                    type={"submit"}
                                    className={`btn btn-lg btn-primary border-left-radius-0`}
                                    onClick={(event) => this.props.searchListFetch({
                                        event,
                                        searchValue: this.props.searchValue,
                                        searchSort: this.props.searchSort,
                                        currentPage: this.props.currentPage
                                    })}>
                                    <FontAwesomeIcon icon={faSearch} className={""}/>
                                </button>
                            </div>

                            <div className="form-group">
                                <label htmlFor="formSearchSortQuery" className={"text-white"}>Упорядочить по</label>
                                <select
                                    className="form-control w-auto"
                                    id={'formSearchSortQuery'}
                                    value={this.props.searchSort}
                                    onChange={event => this.props.searchOptionSortChange(event.target.value)}
                                >
                                    <option value={'1'}>Зарегистрирован</option>
                                    <option value={'2'}>Название темы</option>
                                    <option value={'4'}>Количество скачиваний</option>
                                    <option value={'10'}>Количество сидов</option>
                                    <option value={'11'}>Количество личей</option>
                                    <option value={'7'}>Размер</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="container">
                    {
                        this.props.searchList.length
                            ? <SearchTable/>
                            : null
                    }
                    {
                        this.props.searchList.length
                            ? this.props.searchList[0].search_quantity / 50 > 1
                            ? <SearchPagination
                                paginationHandler={this.paginationHandler}
                                currentPage={this.props.currentPage}
                                quantityPages={this.props.searchList[0].search_quantity / 50}/>
                            : null
                            : null
                    }
                </div>
            </div>
        )
    }

    async getQueryParams() {
        const parsed = queryString.parse(this.props.location.search);

        /**
         * Auto search when loading a component
         */
        if (parsed.query) {

            // this.props.searchListFetch({
            //     searchValue: this.props.searchValue,
            //     searchSort: this.props.searchSort,
            //     currentPage: this.props.currentPage
            // })

            // const searchInput = {...this.state.searchInput};
            // searchInput.value = parsed.query;
            // searchInput.sort = parsed.sort ? parsed.sort : '';
            // const currentPage = parsed.page ? parsed.page : this.state.currentPage;

            // this.setState({
            //     searchInput,
            //     searchList: await this.searchRutrackerAPI({query: parsed.query, sort: parsed.sort, page: currentPage}),
            //     currentPage
            // });
        }
    }

    componentDidMount() {
        this.getQueryParams();
    }
}

function mapStateToProps(state) {
    return {
        searchList: state.search.searchList,
        searchValue: state.search.searchValue,
        searchSort: state.search.searchSort,
        currentPage: state.search.currentPage,
        loading: state.search.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchListFetch: (params) => dispatch(searchListFetch(params)),
        searchChangeValue: value => dispatch({type: SEARCH_CHANGE_VALUE, payload: value}),
        searchOptionSortChange: (value) => dispatch(searchOptionSortChange(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);