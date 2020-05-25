import React from 'react';
import './TopicComments.scss';
import htmlReactParse from "html-react-parser";
import {fixedParseContent} from "../../../func/fixedParseContent";

function TopicComments({comments, loadMoreCommentsHandler}) {
    return (
        <div className={"topic-comments pt-4"}>
            <h4>Комментарии</h4>
            {
                comments.map(({message, avatar, nick, joined, posts, date}, index) => {
                    return (
                        <div className={"topic-comment-item d-flex mb-3 rounded shadow-sm p-3"} key={nick+index}>
                            <div className={"topic-comment-user-info mr-3 w-100"}>
                                <div>{date}</div>
                                <h6>{nick}</h6>
                                {avatar ? <img className={"rounded-circle"} src={avatar} alt={nick}/> : null}
                                <small>{htmlReactParse(`${joined}`)}</small>
                                <small>{htmlReactParse(`${posts}`)}</small>
                            </div>
                            {htmlReactParse(`<div class="topic-comment-message w-100">${fixedParseContent(message)}</div>`)}
                        </div>
                    )
                })
            }
            <button className={"btn btn-outline-primary d-block m-auto"} onClick={() => loadMoreCommentsHandler()}>Загрузить больше комментариев</button>
        </div>
    )
}

export default TopicComments;