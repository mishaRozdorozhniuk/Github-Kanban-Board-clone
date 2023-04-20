import React from 'react';
import {daysSinceIssueCreation} from "../../utils";
import './Issue.css'

interface User {
    login: string;
}

interface IBoard {
    id: number;
    title: string;
    items: IIssue[];
    body?: string;
}

interface IIssue {
    id: number;
    title: string;
    number: number;
    user: User;
    comments: string;
    created_at: string;
}

interface Props {
    item: IIssue;
    board: IBoard;
    dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => any;
    dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => any;
    dragStartHandler: (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IIssue) => any;
    dropEndHandler: (e: React.DragEvent<HTMLDivElement>) => any;
}

const Issue: React.FC<Props> = ({item, dragOverHandler, dragLeaveHandler, dragStartHandler, dropEndHandler, board}) => {
    return (
        <div
            key={item.id}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragEnd={(e) => dropEndHandler(e)}
            draggable={true}
            className="item">
            <span className="issue__title">{item.title}</span>
            <span className="issue__number">#{item.number} opened {daysSinceIssueCreation(item.created_at)} days ago</span>
            <span className="issue__created-at">{item.user.login} | Comments: {item.comments}</span>
        </div>
    );
};

export default Issue;