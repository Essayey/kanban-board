import React, { useState } from 'react'
import AddForm from './AddForm';
import Modal from './UI/Modal window/Modal'

const CardModal = ({ card, closeRef, closeCallback, editTitleCallback }) => {
    const [titleState, setTitleState] = useState(card.title);
    const [textState, setTextState] = useState('');

    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [isTextEditing, setIsTextEditing] = useState(false);


    return (
        <Modal closeRef={closeRef}>
            <div onClick={closeCallback} className='closeIcon CloseIcon-abs'></div>

            {isTitleEditing
                ? <div className='CardModal__title'>
                    <AddForm
                        closeAfterSubmit={true}
                        buttonText={'Edit title'}
                        initialValue={card.title}
                        placeholder={''}
                        closeFormCallback={() => setIsTitleEditing(false)}
                        callback={editTitleCallback} />
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