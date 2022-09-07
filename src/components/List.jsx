import React, { useEffect, useRef, useState } from 'react'
import { doAddCard, doDeleteCard, doEditCard } from '../store';
import { useDispatch } from 'react-redux';

const List = ({ cards, listName, listId }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    const [isCardAdding, setIsCardAdding] = useState(false);

    const textAreaRef = useRef();
    const listScrollRef = useRef();

    useEffect(() => {
        if (isCardAdding) listScrollRef.current.scrollTop = listScrollRef.current.scrollHeight;
    }, [isCardAdding])

    const resizeTextArea = () => {
        textAreaRef.current.style = 'height: auto';
        textAreaRef.current.style = 'height:' + (textAreaRef.current.scrollHeight) + 'px';
    }

    const onInput = e => {
        setValue(e.target.value);
        resizeTextArea();
        listScrollRef.current.scrollTop = listScrollRef.current.scrollHeight;
    }
    const onAddCard = () => {
        setIsCardAdding(true);
    }

    const addCard = (text, boardId, listId, e) => {
        e.preventDefault();
        dispatch(doAddCard({ boardId, listId, text }));
        setIsCardAdding(false);
        setValue('');
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
                {cards.map(card => <div className='Card'>{card.text}</div>)}
                {isCardAdding
                    ? <form onSubmit={e => addCard(value, 0, listId, e)}>
                        <textarea
                            ref={textAreaRef}
                            autoFocus
                            value={value}
                            onChange={onInput}
                            type="text"
                            className='input' />
                        <button type='submit' className='btn'>Add card</button>
                    </form>
                    : null
                }
            </div>
            {isCardAdding
                ? null
                : <div onClick={onAddCard} className='CardAdd'>+ Add card</div>
            }
        </div>
    )
}

export default List