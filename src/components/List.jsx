import React, { useState } from 'react'
import { doAddCard, doDeleteCard, doEditCard } from '../store';
import { useDispatch } from 'react-redux';

const List = ({ cards, listName, listId }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState();

    const addCard = (text, boardId, listId) => {
        dispatch(doAddCard({ boardId, listId, text }));
    }

    const editCard = (newText, boardId, listId, cardId) => {
        dispatch(doEditCard({ boardId, listId, cardId, newText }));
    }

    const deleteCard = (boardId, listId, cardId) => {
        dispatch(doDeleteCard({ boardId, listId, cardId }))
    }

    return (
        <div className='List'>
            <h3>{listName}</h3>
            <div className='List__inner'>
                {cards.map(card => <div className='Card'>{card.text}</div>)}
            </div>
            <input value={value} onChange={e => setValue(e.target.value)} type="text" />
            <div onClick={() => addCard(value, 0, listId)} className='CardAdd'>+ Add card</div>
        </div>
    )
}

export default List