import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({ listId, cardId, card }) => {

    return (
        <div>
            <Link class={'Link-normalize'} to={`${listId}/${cardId}`}>
                <div className='Card'>{card.title}</div>
            </Link>

        </div >
    )
}

export default Card