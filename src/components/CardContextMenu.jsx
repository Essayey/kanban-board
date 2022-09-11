import React, { useRef, useState } from 'react'
import { useEscapeCallback } from '../hooks/useEscapeCallback';
import { useOutsideCallback } from '../hooks/useOutsideCallback'
import ContextMenu from './ContextMenu';
import TextareaForm from './TextareaForm'
import Button from './UI/Button';
import { useDispatch } from 'react-redux';
import { doDeleteCard } from '../store';
import CardMoving from './CardMoving';

const CardContextMenu = ({
    listId, cardId, boardId,
    initialValue,
    closeFormCallback,
    callback,
    top,
    left
}) => {
    const [isMoving, setIsMoving] = useState(false);
    const dispatch = useDispatch();

    const onDeleteCard = () => {
        dispatch(doDeleteCard({ boardId, listId, cardId }));
        closeFormCallback();
    }

    const onOpenMoveContextMenu = () => {
        setIsMoving(true);
    }


    const menuRef = useRef();
    useOutsideCallback(closeFormCallback, menuRef);
    useEscapeCallback(closeFormCallback);
    const movingFormRef = useRef();

    useOutsideCallback(() => setIsMoving(false), movingFormRef);

    return (
        <div>
            <div className='CardContextMenu__background'></div>
            <div ref={menuRef}>
                <div
                    style={{ top: top, left: left }}
                    className='CardContextMenu-form'>
                    <TextareaForm
                        closeNotSubmitting={true}
                        closeAfterSubmit={true}
                        buttonText={'Edit title'}
                        initialValue={initialValue}
                        closeFormCallback={closeFormCallback}
                        callback={callback}
                    />
                </div >

                <ContextMenu top={top} left={left + 260}>
                    <Button className='ContextMenu-btn' onClick={onDeleteCard}>Delete card</Button>
                    <Button className='ContextMenu-btn' onClick={onOpenMoveContextMenu}>Move card</Button>
                    {isMoving
                        ? <ContextMenu ref={movingFormRef} top={80} left={10}>
                            <CardMoving
                                boardId={boardId}
                                listId={listId}
                                cardId={cardId}
                                closeFormCallback={closeFormCallback}
                            />
                        </ContextMenu>
                        : null
                    }

                </ContextMenu>
            </div>

        </div>

    )
}

export default CardContextMenu