import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { doEditCardTitle } from '../store';
import CardContextMenu from './CardContextMenu';


const Card = ({ listId, cardId, card }) => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const [isEditing, setIsEditing] = useState(false);

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
    return (
        <div className='Card'>
            <Link onContextMenu={onContextMenu} class={'Link-normalize'} to={`${listId}/${cardId}`}>
                <div>
                    {card.title}
                </div>
            </Link>
            {
                isEditing
                    ? <CardContextMenu
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