import React, { useEffect, useRef, useState } from 'react'
import { doAddCard, doDeleteList, doMoveCard, doRenameList } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import TextareaForm from './TextareaForm';
import { useOutsideCallback } from '../hooks/useOutsideCallback';
import { useEscapeCallback } from '../hooks/useEscapeCallback';
import { useParams } from 'react-router-dom';

const List = ({ cards, listName, listId }) => {
    const dispatch = useDispatch();

    let { boardId } = useParams();
    boardId = Number(boardId);

    const [isCardAdding, setIsCardAdding] = useState(false);
    const [listNameState, setListNameState] = useState(listName);
    const [isListRenaming, setIsListRenaming] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const listScrollRef = useRef();
    const renameFormRef = useRef();
    const list = useSelector(state => state.boards[boardId].lists[listId]);
    const dropCardState = useSelector(state => state.dropCardState);

    useOutsideCallback(() => { setIsListRenaming(false) }, renameFormRef);

    useEscapeCallback(() => { setIsListRenaming(false) });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(doRenameList({ newName: listNameState, boardId: boardId, listId }));
    }


    useEffect(() => {
        if (isCardAdding) listScrollRef.current.scrollTop = listScrollRef.current.scrollHeight;
    }, [isCardAdding, cards.length])

    const deleteList = () => {
        dispatch(doDeleteList({ boardId: boardId, listId }))
    }

    const addCard = text => {
        dispatch(doAddCard({ boardId: boardId, listId, text }));
    }

    const dragOverHandler = e => {
        e.preventDefault();
        setIsDragOver(true);
    }
    const dragLeaveHandler = e => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsDragOver(false);
    }
    const dropHandler = e => {
        e.preventDefault();

        if (list.cards.length === 0) {
            dispatch(doMoveCard({
                destBoardId: dropCardState.boardId,
                destListId: listId,
                destCardId: 0,
                srcBoardId: dropCardState.boardId,
                srcListId: dropCardState.srcListId,
                srcCardId: dropCardState.srcCardId,
            }))
        }

    }

    return (
        <div className='List' draggable='false '
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}>
            {isListRenaming
                ? <form ref={renameFormRef} onSubmit={onSubmit}>
                    <input
                        value={listNameState}
                        onChange={e => setListNameState(e.target.value)}
                        autoFocus
                        type="text" />
                </form>
                : <div className='List__header'>
                    <h3 onClick={() => setIsListRenaming(true)}>{listName}</h3>
                    <div onClick={deleteList} className='closeIcon'></div>
                </div>
            }

            <div ref={listScrollRef} className='List__inner'

            >
                {list.cards.length === 0 && isDragOver
                    ? <div className={'CardSkeleton'}></div>
                    : null
                }
                {cards.map((card, index) => <Card

                    card={card}
                    cardId={index}
                    boardId={boardId}
                    listId={listId}
                    key={card.title + index}
                    title={card.title} />)}
                {isCardAdding
                    ? <TextareaForm
                        closeAfterSubmit={false}
                        buttonText='Add card'
                        placeholder='Type the title of the card'
                        callback={addCard}
                        closeFormCallback={() => setIsCardAdding(false)}
                        listScrollRef={listScrollRef}
                        hasCloseBtn={true}
                    />
                    : null
                }
            </div>
            {isCardAdding
                ? null
                : <div onClick={() => setIsCardAdding(true)} className='CardAdd'>
                    ➕ Add card
                </div>
            }
        </div>
    )
}

export default List