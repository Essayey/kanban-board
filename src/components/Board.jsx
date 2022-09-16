import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { doAddList, doMoveList } from '../store'
import TextareaForm from './TextareaForm'
import List from './List'

const Board = () => {
    const [isListAdding, setIsListAdding] = useState(false);

    let { boardId } = useParams();
    boardId = Number(boardId);

    const board = useSelector(state => state.boards[boardId]);

    const dispatch = useDispatch();

    const addList = listName => {
        dispatch(doAddList({ boardId, listName }));
    }
    // D'n'd
    const dragItemNode = useRef();
    const dragItem = useRef();


    const [dragging, setDragging] = useState(false);

    const handleDragStart = (e, listId) => {
        if (e.target.className !== 'List') return;
        dragItemNode.current = e.target;
        dragItem.current = listId;

        dragItemNode.current.addEventListener('dragend', handleDragEnd);

        setTimeout(() => {
            setDragging(true);
        }, 0)
    }

    const handleDragEnd = () => {
        dragItemNode.current.removeEventListener('dragend', handleDragEnd);
        dragItemNode.current = null;
        setDragging(false);
    }

    const handleDragEnter = (e, srcId, destId) => {
        if (srcId !== destId) {
            dispatch(doMoveList({
                boardId: boardId,
                srcListId: srcId,
                destListId: destId
            }))
            dragItem.current = destId;
        }
    }

    const getStyle = (listId) => {
        if (listId === dragItem.current) return { background: '#fff' }
        return {}
    }

    return (
        <div className='Board'>
            <div className='Board__inner'>
                {board.lists.map((list, index) =>
                    <List key={list.listName + index}
                        cards={list.cards}
                        listName={list.listName}
                        listId={index}
                        onDragStart={e => handleDragStart(e, index)}
                        onDragEnter={dragging ? e => handleDragEnter(e, dragItem.current, index) : null}
                        style={dragging ? getStyle(index) : {}} />)}

                {isListAdding
                    ? <div className='AddList'>
                        <TextareaForm
                            closeAfterSubmit={true}
                            buttonText='Add list'
                            placeholder='Type the title of the list'
                            closeFormCallback={() => setIsListAdding(false)}
                            callback={addList}
                            hasCloseBtn={true}
                        />
                    </div>
                    : <h3 className='AddList AddListHeader' onClick={() => setIsListAdding(true)}>
                        Add list
                    </h3>
                }
            </div>
            <Outlet />
        </div>
    )
}

export default Board