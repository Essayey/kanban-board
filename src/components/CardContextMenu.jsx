import React, { useEffect, useRef, useState } from 'react'
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
    const [calculatedTop, setCalculatedTop] = useState(top);
    const [calculatedLeft, setCalculatedLeft] = useState(left);
    const [contextMenuPosition, setContextMenuPosition] = useState(1);
    const dispatch = useDispatch();

    const onDeleteCard = () => {
        dispatch(doDeleteCard({ boardId, listId, cardId }));
        closeFormCallback();
    }

    const onOpenMoveContextMenu = () => {
        setIsMoving(true);
    }

    useEffect(() => {
        setCalculatedTop(calculatedTop < window.innerHeight - 300 ? calculatedTop : window.innerHeight - 300)
        setCalculatedLeft(calculatedLeft < window.innerWidth - 300 ? calculatedLeft : window.innerWidth - 300)
        setContextMenuPosition(calculatedLeft < window.innerWidth - 350 ? 1 : -1);
    }, [window.innerHeight, window.innerWidth])



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
                    style={{ top: calculatedTop, left: calculatedLeft }}
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

                <ContextMenu top={calculatedTop} left={calculatedLeft + 260 * contextMenuPosition}>
                    <Button className='ContextMenu-btn' onClick={onDeleteCard}>Delete card</Button>
                    <Button className='ContextMenu-btn' onClick={onOpenMoveContextMenu}>Move card</Button>
                    {isMoving
                        ? <ContextMenu ref={movingFormRef} top={100} left={-50}>
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