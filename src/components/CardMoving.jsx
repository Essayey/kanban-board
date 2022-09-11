import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doMoveCard } from '../store';
import Button from './UI/Button';

const CardMoving = ({
    boardId,
    listId,
    cardId,
    closeFormCallback
}) => {
    const dispatch = useDispatch();
    const boards = useSelector(state => state.boards)

    const [boardNumber, setboardNumber] = useState(boardId);
    const [listNumber, setListNumber] = useState(boards[boardId].lists.length > listId + 1 ? listId + 1 : 0);
    const [position, setPosition] = useState(0);

    useEffect(() => {
        setListNumber(0);
        setPosition(0);
    }, [boardNumber])

    const moveCard = e => {
        e.preventDefault();
        dispatch(doMoveCard({
            destBoardId: boardNumber,
            destListId: listNumber,
            destCardId: position,
            srcBoardId: boardId,
            srcListId: listId,
            srcCardId: cardId
        }))
        closeFormCallback();
    }

    return (
        <div className='CardMoving'>
            <div className='CardMoving__title'>
                Card moving
            </div>

            <form className='CardMoving__form'>
                <div className='CardMoving__flex'>
                    <div className='CardMoving__text'>
                        Select board
                    </div>
                    <select value={boardNumber} onChange={e => setboardNumber(e.target.value)}>
                        {boards.map((board, index) => <option key={index} value={index}>{board.name}</option>)}
                    </select>
                </div>
                <div className='CardMoving__flex'>
                    <div className='CardMoving__text'>
                        Select column
                    </div>
                    <select value={listNumber} onChange={e => setListNumber(e.target.value)}>
                        {boards[boardNumber].lists.map((list, index) => <option key={index} value={index}>{list.listName}</option>)}
                    </select>
                </div>
                <div className='CardMoving__flex'>
                    <div className='CardMoving__text'>
                        Select position
                    </div>
                    <select value={position} onChange={e => setPosition(e.target.value)}>
                        {boards[boardNumber].lists[listNumber].cards.map((_, index) => <option key={index} value={index}>{index + 1}</option>)}
                        <option value={boards[boardNumber].lists[listNumber].cards.length}>
                            {boards[boardNumber].lists[listNumber].cards.length + 1}
                        </option>
                    </select>
                </div>
                <div className={'CardMoving__btn'}>
                    <Button onClick={moveCard} variant='primary'>Move card</Button>
                </div>


            </form>
        </div>
    )
}

export default CardMoving