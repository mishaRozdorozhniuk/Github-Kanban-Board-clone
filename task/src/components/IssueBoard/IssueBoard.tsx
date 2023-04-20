import React, {useState} from 'react';
import Issue from "../Issue/Issue";
import './IssueBoard.css'

interface User {
    login: string;
}

interface IIssue {
    id: number;
    title: string;
    number: number;
    user: User;
    comments: string;
    created_at: string;
}

interface IBoard {
    id: number;
    title: string;
    items: IIssue[];
    body?: string;
}

interface Props {
    boards: IBoard[];
    setBoards: React.Dispatch<React.SetStateAction<{ id: number; title: string; items: never[] }[]>>;
}

const IssueBoard: React.FC<Props> = ({boards, setBoards}) => {
    const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
    const [currentItem, setCurrentItem] = useState<IIssue | null>(null);

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        (e.target as HTMLDivElement).style.border = 'none';
    }

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IIssue) => {
        (e.target as HTMLDivElement).style.border = '1px solid #1f6feb';
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    const dropEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        (e.target as HTMLDivElement).style.border = 'none';
    }

    const dropCardHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoard): void => {
        if(currentItem !== null) {
            board.items?.push(currentItem);
            const currentIndex = currentBoard?.items?.indexOf(currentItem) ?? -1;
            currentBoard?.items?.splice(currentIndex, 1);
            setBoards(boards?.map((b: any) => {
                if(b.id === board.id) {
                    return board;
                } if(b.id === currentBoard?.id) {
                    return currentBoard;
                }
                return b;
            }));
        }
    }

    return (
        <div className="board__wrapper" role="board__wrapper">
            {boards.length && boards.map((board: IBoard) =>
                <div
                    key={board.id}
                    className="board"
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}>
                    <div className="board__title">{board.title}</div>
                    {board && board.items?.map((item: IIssue) =>
                        // using React.Fragment to set key and avoid unnecessary div.
                        <React.Fragment key={item.id}>
                            <Issue
                                item={item}
                                board={board}
                                dragOverHandler={dragOverHandler}
                                dragLeaveHandler={dragLeaveHandler}
                                dragStartHandler={dragStartHandler}
                                dropEndHandler={dropEndHandler}
                            />
                        </React.Fragment>
                    ) }
                </div>
            )}
        </div>
    );
};

export default IssueBoard;