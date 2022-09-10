import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CardPopup from './CardPopup';

const Card = ({ listId, cardId, card }) => {
    const [isEditing, setIsEditing] = useState(false);

    const onContextMenu = e => {
        e.preventDefault()
        setIsEditing(true);
    }

    return (
        <div>
            <Link onContextMenu={onContextMenu} class={'Link-normalize'} to={`${listId}/${cardId}`}>
                <div className='Card'>
                    {card.title}
                </div>
            </Link>
            {
                isEditing

                    ? <CardPopup

                    />
                    : null

            }

        </div >
    )
}

export default Card