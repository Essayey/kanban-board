import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { doEditCardTitle, doInsertCard, doMoveCard, doWriteDropDest, doWriteDropSrc } from '../store';
import CardContextMenu from './CardContextMenu';


const Card = ({ listId, cardId, card }) => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [cardRect, setCardRect] = useState();
    const [isDragOver, setIsDragOver] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dropPosition, setDropPosition] = useState(true);
    const [isDragOverFired, setIsDragOverFired] = useState(false);
    const cardRef = useRef();
    const dropRef = useRef();
    const dropCardState = useSelector(state => state.dropCardState);

    useEffect(() => {
        if (!isDragOver) {
            setIsDragOverFired(false);
        }
    }, [isDragOver])

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

    const dragStartHandler = (e, card) => {
        setIsDragging(true);
        dispatch(doWriteDropSrc({ cardId, listId, boardId }));
        console.log('card ' + cardId, 'list ' + listId);
    }
    const dragLeaveHandler = e => {
        e.preventDefault();
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsDragOver(false);
    }

    const dragEndHandler = e => {
        setIsDragOver(false);
        setIsDragging(false);
    }
    const dragOverHandler = e => {
        if (!isDragging) {
            e.preventDefault();
            setIsDragOver(true);
            const rect = dropRef.current.getBoundingClientRect();
            const y = e.clientY - rect.top;
            setDropPosition(y > rect.height / 2 ? true : false);
            setIsDragOverFired(true);
        }
    }

    const dropHandler = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        console.log('dest card ' + cardId, 'destList ' + listId)
        const dropPos = dropPosition ? 1 : 0;
        dispatch(doMoveCard({
            destBoardId: dropCardState.boardId,
            destListId: listId,
            destCardId: cardId + dropPos,
            srcBoardId: dropCardState.boardId,
            srcListId: dropCardState.srcListId,
            srcCardId: dropCardState.srcCardId
        }))
        console.log(dropPos)
    }

    return (
        <div
            ref={dropRef}
            onDragStart={e => dragStartHandler(e, card)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e, card)}
            draggable={!isEditing}>
            {isDragOver && !dropPosition
                ? <div className={'CardSkeleton'}></div>
                : null
            }
            <div
                onContextMenu={calculatePosition}
                ref={cardRef}
                className='Card'>

                <Link draggable={false} style={{ width: '100%', height: '100%' }} onContextMenu={onContextMenu} className={'Link-normalize'} to={`${listId}/${cardId}`}>
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
            </div>
            {isDragOver && dropPosition
                ? <div className={'CardSkeleton'}></div>
                : null
            }
        </div>

    )
}

export default Card