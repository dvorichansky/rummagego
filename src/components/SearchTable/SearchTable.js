import React from 'react';
import SearchList from "../SearchList/SearchList";
import './SearchTable.scss';

import {faSort, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SORT_ASCENDING, SORT_DESCENDING} from "../../containers/Search/SearchTypes/SearchTypes";
import {connect} from "react-redux";
import {searchListSortKey} from "../../store/actions/search";

class SearchTable extends React.Component {

    sortIconRender = (key) => {
        const keyValue = this.props.searchListSort[key];

        switch (keyValue) {
            case SORT_ASCENDING:
                return <FontAwesomeIcon icon={faSortUp}/>;
            case SORT_DESCENDING:
                return <FontAwesomeIcon icon={faSortDown}/>;
            default:
                return <FontAwesomeIcon icon={faSort}/>;
        }
    };

    render() {
        return (
            <table className={"search-table table w-100 small text-center"}>
                <thead>
                    <tr className={""}>
                        <th></th>
                        <th className={"w-25"}>
                            <button
                                className={'btn'}
                                onClick={() => this.props.searchListSortKey('category')}
                            >Категория {this.sortIconRender('category')}</button>
                        </th>
                        <th className={"w-75"}>
                            <button
                                className={'btn'}
                                onClick={() => this.props.searchListSortKey('title')}
                            >Тема {this.sortIconRender('title')}</button>
                        </th>
                        <th>
                            <button
                                className={'btn'}
                                onClick={() => this.props.searchListSortKey('author')}
                            >Автор {this.sortIconRender('author')}</button>
                        </th>
                        <th>
                            <button
                                className={'btn'}
                                onClick={() => this.props.searchListSortKey('size')}
                            >Размер {this.sortIconRender('size')}</button>
                        </th>
                        <th title={"Сиды"}>
                            <button
                                className={'btn'}
                                onClick={() => this.props.searchListSortKey('seeds')}
                            >S {this.sortIconRender('seeds')}</button>
                        </th>
                        <th title={"Личи"}>
                            <button
                                className={'btn'}
                                onClick={() => this.props.searchListSortKey('leeches')}
                            >L {this.sortIconRender('leeches')}</button>
                        </th>
                        <th title={"Торрент скачан"}>
                            <button
                                className={'btn'}
                                onClick={() => this.props.searchListSortKey('downloads')}
                            >C {this.sortIconRender('downloads')}</button>
                        </th>
                        <th>
                            <button
                                className={'btn'}
                                onClick={() => this.props.searchListSortKey('registered')}
                            >Добавлен {this.sortIconRender('registered')}</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.searchList.length
                        ? <SearchList data={this.props.searchList}/>
                        : null
                }
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchList: state.search.searchList,
        searchListSort: state.search.searchListSort
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchListSortKey: (key) => dispatch(searchListSortKey(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);
