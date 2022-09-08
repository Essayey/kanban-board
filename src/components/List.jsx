import React, { useEffect, useRef, useState } from 'react'
import { doAddCard, doDeleteCard, doEditCard, doRenameList } from '../store';
import { useDispatch } from 'react-redux';
import Card from './Card';
import AddForm from './AddForm';
import { useEscapeCallback, useOutsideCallback } from '../hooks/useOutsideCallback';

const List = ({ cards, listName, listId }) => {
    const dispatch = useDispatch();
    const [isCardAdding, setIsCardAdding] = useState(false);
    const [listNameState, setListNameState] = useState(listName);
    const [isListRenaming, setIsListRenaming] = useState(false);
    const listScrollRef = useRef();

    const renameFormRef = useRef();
    useOutsideCallback(() => { setIsListRenaming(false) }, renameFormRef);

    useEscapeCallback(() => { setIsListRenaming(false) });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(doRenameList({ newName: listNameState, boardId: 0, listId }));
    }


    useEffect(() => {
        if (isCardAdding) listScrollRef.current.scrollTop = listScrollRef.current.scrollHeight;
    }, [isCardAdding, cards.length])

    const onAddCard = () => {
        setIsCardAdding(true);
    }

    const addCard = text => {
        dispatch(doAddCard({ boardId: 0, listId, text }));
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
                : <h3 onClick={() => setIsListRenaming(true)}>{listName}</h3>
            }

            <div ref={listScrollRef} className='List__inner'>
                {cards.map((card, index) => <Card key={card.title + index} title={card.title} />)}
                {isCardAdding
                    ? <AddForm
                        buttonText='Add card'
                        placeholder='Type the title of the card'
                        callback={addCard}
                        closeFormCallback={() => setIsCardAdding(false)}
                        listScrollRef={listScrollRef}
                    />
                    : null
                }
            </div>
            {
                isCardAdding
                    ? null
                    : <div onClick={onAddCard} className='CardAdd'>+ Add card</div>
            }
        </div>
    )
}

export default List