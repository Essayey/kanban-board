import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { doEditCard } from '../store';
import AddForm from './AddForm';
import Modal from './UI/Modal window/Modal'

const CardModal = () => {
    const navigate = useNavigate();
    const { boardId, listId, cardId } = useParams();

    const card = useSelector(state => state.boards[boardId].lists[listId].cards[cardId])
    const dispatch = useDispatch();

    const [isTitleEditing, setIsTitleEditing] = useState(false);
    // TODO: add description edit
    const [isTextEditing, setIsTextEditing] = useState(false);


    const editTitle = newText => {
        dispatch(doEditCard({
            boardId: Number(boardId),
            listId: Number(listId),
            cardId: Number(cardId),
            newText: newText
        }))
    }

    return (
        <Modal closeCallback={() => navigate('../')}>
            <Link className='closeIcon CloseIcon-abs' to={'../'} />
            {isTitleEditing
                ? <div className='CardModal__title'>
                    <AddForm
                        closeAfterSubmit={true}
                        buttonText={'Edit title'}
                        initialValue={card.title}
                        placeholder={''}
                        closeFormCallback={() => setIsTitleEditing(false)}
                        callback={editTitle} />
                </div>

                : <div onClick={() => setIsTitleEditing(true)} className='CardModal__title'>
                    <h3>{card.title}</h3>
                </div>
            }

            <div className='CardModal__description'>
                <h3>Description</h3>
                <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, obcaecati.
                </span>
            </div>
        </Modal>
    )
}

export default CardModal