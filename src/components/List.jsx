import React, { useEffect, useRef, useState } from 'react'
import { doAddCard, doDeleteCard, doEditCard } from '../store';
import { useDispatch } from 'react-redux';
import Card from './Card';
import AddCardForm from './AddCardForm';

const List = ({ cards, listName, listId }) => {
    const dispatch = useDispatch();
    const [isCardAdding, setIsCardAdding] = useState(false);
    const listScrollRef = useRef();


    useEffect(() => {
        if (isCardAdding) listScrollRef.current.scrollTop = listScrollRef.current.scrollHeight;
    }, [isCardAdding, cards.length])

    const onAddCard = () => {
        setIsCardAdding(true);
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
            <div ref={listScrollRef} className='List__inner'>
                {cards.map(card => <Card title={card.title} />)}
                {isCardAdding
                    ? <AddCardForm
                        boardId={0}
                        listId={listId}
                        setIsCardAdding={setIsCardAdding}
                        listScrollRef={listScrollRef} />
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