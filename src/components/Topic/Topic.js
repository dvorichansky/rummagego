import React, {Component, createRef} from 'react';
import './Topic.scss';
import {withRouter} from 'react-router-dom';
import queryString from "query-string";
import htmlReactParse from "html-react-parser";
import {faHome, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TopicComments from "./TopicComments/TopicComments";
import {fixedParseContent} from "../../func/fixedParseContent";
import {URL_API} from "../../constants";

class Topic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicId: '',
            topic: {},
            topicContentFixed: false,
            topicCmBox: 0
        };

        this.buttonClose = createRef();
        this.loadMoreCommentsHandler = this.loadMoreCommentsHandler.bind(this);
    }

    topicRutrackerAPI(params) {
        this.context.setLoaderStatus(true);

        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        const id = (typeof params === 'object' && params.id) ? params.id : this.state.topicId;
        const cm_box = (typeof params === 'object' && params.cm_box) ? params.cm_box : this.state.topicCmBox;

        return fetch(`${URL_API}rutracker?username=${username}&password=${password}&id=${id}&cm_box=${cm_box}`)
            .then(res => res.text())
            .then(res => {
                const responseObject = JSON.parse(res);
                console.log(responseObject);
                this.context.setLoaderStatus(false);
                return responseObject;
            });
    }

    async getTopic() {
        const parsed = queryString.parse(this.props.location.search);

        const topic = await this.topicRutrackerAPI({id: parsed.id});

        // fix topic
        const content = fixedParseContent(topic.content);
        topic.content = content;

        this.setState({
            topicId: parsed.id,
            topic
        })
    }

    renderTopicData() {
        const {created, since, image, content, magnet} = this.state.topic;

        return (
            <>
                <div className={"d-flex mb-3"}>
                    <small className={""}>
                        <span className={"text-primary"}>{created} </span>
                        <span className={"text-muted"}>{since}</span>
                    </small>
                    <a
                        className={"btn btn-sm btn-info ml-auto"}
                        href={magnet}
                    >Скачать по magnet-ссылке</a>
                    <a
                        className={"btn btn-sm btn-success ml-3"}
                        href={`http://rutracker.org/forum/dl.php?t=${this.state.topicId}`}
                    >Скачать .torrent</a>

                </div>

                {htmlReactParse(content)}
                <TopicComments
                    comments={this.state.topic.comments}
                    loadMoreCommentsHandler={this.loadMoreCommentsHandler}
                />
            </>
        )
    }

    goBackTopicHandler() {
        this.props.history.goBack()
    }

    clickOutsideModalHandler(event) {
        if (!event.target.classList.contains('modal-topic')) {
            return;
        }

        this.goBackTopicHandler();
    }

    async loadMoreCommentsHandler() {
        let cm_box = this.state.topicCmBox + 1;
        // cm_box = cm_box ? cm_box : 1;

        const newTopicComments = await this.topicRutrackerAPI({cm_box});

        const topic = {...this.state.topic};
        const commentsConcat = topic.comments.concat(newTopicComments);
        topic.comments = commentsConcat;

        console.log(topic);

        this.setState({
            topic,
            topicCmBox: cm_box
        })
    }

    render() {
        return (
            <>
                {
                    typeof this.props.history.location.state === 'object' && this.props.history.location.state.hasOwnProperty('searchList')
                        ? <div
                            className={`modal-topic modal fade ${Object.keys(this.state.topic).length ? 'show d-block' : null}`}
                            onClick={event => this.clickOutsideModalHandler(event)}
                        >
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                ref={this.buttonClose}
                                onClick={() => this.goBackTopicHandler()}
                            >
                                <span aria-hidden="true"><FontAwesomeIcon icon={faTimes} className={""}/></span>
                            </button>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="topic-content">
                                            {
                                                Object.keys(this.state.topic).length
                                                    ? this.renderTopicData()
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className={"topic-wrapper container mt-5 mb-5"}>
                            <div className="topic-content">
                                {
                                    Object.keys(this.state.topic).length
                                        ? this.renderTopicData()
                                        : null
                                }
                            </div>
                        </div>
                }
            </>

        );
    }

    componentDidMount() {
        if (typeof this.props.history.location.state === 'object' && this.props.history.location.state.hasOwnProperty('searchList')) {
            document.body.classList.add('modal-open');
        }

        if (!Object.keys(this.state.topic).length) {
            this.getTopic();
        }
    }

    componentDidUpdate() {
        if (this.buttonClose.current) {
            this.buttonClose.current.focus();
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('modal-open');
    }
}

export default withRouter(Topic);