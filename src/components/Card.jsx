import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useEscapeCallback, useOutsideCallback } from '../hooks/useOutsideCallback';
import { doEditCard } from '../store';
import CardModal from './CardModal'

const Card = ({ boardId, listId, cardId, card }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef();

    useOutsideCallback(() => setIsOpen(false), modalRef);
    useEscapeCallback(() => setIsOpen(false));

    const editTitle = newText => {
        dispatch(doEditCard({ boardId, listId, cardId: cardId, newText }))
    }

    return (
        <div>
            <div className='Card' onClick={() => setIsOpen(true)}>{card.title}</div>
            {isOpen
                ? <CardModal
                    card={card}
                    editTitleCallback={editTitle}
                    closeRef={modalRef}
                    closeCallback={() => setIsOpen(false)}
                    title='Card 1'
                    text='Lorem ipsum dolor sit amet, 
            consectetur adipisicing elit. Voluptates, nesciunt!'/>
                : null}

        </div>
    )
}

export default Card