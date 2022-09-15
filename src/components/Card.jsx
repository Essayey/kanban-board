import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { doEditCardTitle, doMoveCard, doSetDragging, doSetPrevEnterCard, doWriteDropSrc } from '../store';
import CardContextMenu from './CardContextMenu';

const Card = ({ listId, cardId, card }) => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [cardRect, setCardRect] = useState();
    const cardRef = useRef();

    // Context menu
    const editTitle = newText => {
        dispatch(doEditCardTitle({
            boardId: Number(boardId),
            listId: Number(listId),
            cardId: Number(cardId),
            newText: newText
        }))
    }

    const calculatePosition = () => {
        setCardRect(cardRef.current.getBoundingClientRect());
    }

    const onContextMenu = e => {
        e.preventDefault()
        setIsEditing(true);
        calculatePosition();
    }


    // Drag'n'drop
    const dragItemNode = useRef();
    const { srcCardId, srcListId, dragging } = useSelector(state => state.dropCardState);
    const [firstRender, setFirstRender] = useState(true);
    const preventEnterFire = useRef(false);
    setTimeout(() => {
        setFirstRender(false);
    }, 10)

    const handleDragStart = (e, cardId, listId) => {
        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd);

        dispatch(doWriteDropSrc({ cardId, listId }));

        setTimeout(() => {
            dispatch(doSetDragging(true));
        }, 0)

    }
    const handleDragEnd = () => {
        dispatch(doSetDragging(false));
        dispatch(doWriteDropSrc({ cardId: null, listId: null }));
        dragItemNode.current.removeEventListener('dragend', handleDragEnd);
        dragItemNode.current = null;
    }
    const handleDragEnter = (e, cardId, listId) => {
        e.preventDefault();
        if ((cardId !== srcCardId || listId !== srcListId)
            && preventEnterFire.current) {
            dispatch(doMoveCard({
                srcBoardId: boardId,
                destBoardId: boardId,
                srcListId: srcListId,
                destListId: listId,
                srcCardId: srcCardId,
                destCardId: cardId
            }))
            dispatch(doWriteDropSrc({ cardId, listId }));
            preventEnterFire.current = false;
        }
        preventEnterFire.current = true;
    }

    const getStyle = (cardId, listId) => {
        if (cardId == srcCardId && listId == srcListId) return { color: 'transparent', background: '#ccc' };
        return {}
    }
    return (
        <div draggable={!isEditing}
            onDragStart={e => handleDragStart(e, cardId, listId)}
            onDragEnter={!firstRender && dragging ? e => handleDragEnter(e, cardId, listId) : null}
            onContextMenu={onContextMenu}
        >

            <div

                ref={cardRef}
                className={'Card'}
                style={dragging ? getStyle(cardId, listId) : {}}>

                <Link draggable={false} style={{ width: '100%', height: '100%' }} className={'Link-normalize'} to={`${listId}/${cardId}`}>
                    <div style={dragging ? getStyle(cardId, listId) : {}}>
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
        </div>

    )
}

export default Card