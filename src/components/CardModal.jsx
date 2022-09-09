import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { doEditCard, doEditCardDescription, doEditCardTitle } from '../store';
import AddForm from './AddForm';
import Modal from './UI/Modal window/Modal'

const CardModal = () => {
    const navigate = useNavigate();
    const { boardId, listId, cardId } = useParams();

    const card = useSelector(state => state.boards[boardId].lists[listId].cards[cardId])
    const dispatch = useDispatch();

    const [isTitleEditing, setIsTitleEditing] = useState(false);
    // TODO: add description edit
    const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);


    const editTitle = newText => {
        dispatch(doEditCardTitle({
            boardId: Number(boardId),
            listId: Number(listId),
            cardId: Number(cardId),
            newText: newText
        }))
    }

    const editDescription = newDescription => {
        dispatch(doEditCardDescription({
            boardId: Number(boardId),
            listId: Number(listId),
            cardId: Number(cardId),
            newDescription: newDescription
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
                {isDescriptionEditing
                    ? <div>
                        <AddForm
                            closeAfterSubmit={true}
                            buttonText={'Edit description'}
                            initialValue={card.description}
                            placeholder={''}
                            closeFormCallback={() => setIsDescriptionEditing(false)}
                            callback={editDescription} />
                    </div>

                    : <div onClick={() => setIsDescriptionEditing(true)}>
                        {card.description
                            ? <div>{card.description}</div>
                            : <div style={{ cursor: 'pointer' }}>Add description to your card</div>
                        }
                    </div>
                }
            </div>
        </Modal>
    )
}

export default CardModal