import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { doEditCardTitle } from '../store';
import CardContextMenu from './CardContextMenu';


const Card = ({ listId, cardId, card }) => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [cardRect, setCardRect] = useState();
    const cardRef = useRef();


    const editTitle = newText => {
        dispatch(doEditCardTitle({
            boardId: Number(boardId),
            listId: Number(listId),
            cardId: Number(cardId),
            newText: newText
        }))
    }

    const onContextMenu = e => {
        e.preventDefault()
        setIsEditing(true);
    }

    const calculatePosition = () => {
        setCardRect(cardRef.current.getBoundingClientRect());
    }

    return (
        <div onContextMenu={calculatePosition} ref={cardRef} className='Card'>
            <Link onContextMenu={onContextMenu} className={'Link-normalize'} to={`${listId}/${cardId}`}>
                <div>
                    {card.title}
                </div>
            </Link>
            {
                isEditing
                    ? <CardContextMenu
                        top={cardRect.top}
                        left={cardRect.left}
                        boardId={boardId}
                        listId={listId}
                        cardId={cardId}
                        initialValue={card.title}
                        buttonText={'Rename'}
                        closeFormCallback={() => setIsEditing(false)}
                        callback={editTitle}
                    />
                    : null
            }

        </div >
    )
}

export default Card