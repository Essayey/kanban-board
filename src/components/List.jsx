import React, { useEffect, useRef, useState } from 'react'
import { doAddCard, doDeleteList, doRenameList } from '../store';
import { useDispatch } from 'react-redux';
import Card from './Card';
import TextareaForm from './TextareaForm';
import { useOutsideCallback } from '../hooks/useOutsideCallback';
import { useEscapeCallback } from '../hooks/useEscapeCallback';
import { useParams } from 'react-router-dom';
import CardContextMenu from './CardContextMenu';

const List = ({ cards, listName, listId }) => {
    const dispatch = useDispatch();

    let { boardId } = useParams();
    boardId = Number(boardId);

    const [isCardAdding, setIsCardAdding] = useState(false);
    const [listNameState, setListNameState] = useState(listName);
    const [isListRenaming, setIsListRenaming] = useState(false);

    const listScrollRef = useRef();
    const renameFormRef = useRef();

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
        console.log(boardId)
        dispatch(doAddCard({ boardId: boardId, listId, text }));
    }

    return (
        <div className='List'>
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

            <div ref={listScrollRef} className='List__inner'>
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