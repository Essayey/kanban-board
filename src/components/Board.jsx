import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { doAddList } from '../store'
import TextareaForm from './TextareaForm'
import List from './List'

const Board = () => {
    const [isListAdding, setIsListAdding] = useState(false);

    let { boardId } = useParams();
    boardId = Number(boardId);

    const board = useSelector(state => state.boards[boardId]);

    const dispatch = useDispatch();

    const addList = listName => {
        dispatch(doAddList({ boardId, listName }));
    }

    return (
        <div className='Board'>
            <div className='Board__inner'>
                {board.lists.map((list, index) =>
                    <List key={list.listName + index}
                        cards={list.cards}
                        listName={list.listName}
                        listId={index} />)}

                {isListAdding
                    ? <div className='AddList'>
                        <TextareaForm
                            closeAfterSubmit={true}
                            buttonText='Add list'
                            placeholder='Type the title of the list'
                            closeFormCallback={() => setIsListAdding(false)}
                            callback={addList}
                            hasCloseBtn={true}
                        />
                    </div>
                    : <h3 className='AddList AddListHeader' onClick={() => setIsListAdding(true)}>
                        Add list
                    </h3>
                }
            </div>
            <Outlet />
        </div>
    )
}

export default Board