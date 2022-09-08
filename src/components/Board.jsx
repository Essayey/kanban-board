import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { doAddList } from '../store'
import AddForm from './AddForm'
import List from './List'

const Board = ({ board }) => {
    const [isListAdding, setIsListAdding] = useState(false);
    const dispatch = useDispatch();

    const addList = listName => {
        dispatch(doAddList({ boardId: 0, listName }));
    }
    console.log(isListAdding)

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
                        <AddForm
                            buttonText='Add list'
                            placeholder='Type the title of the list'
                            closeFormCallback={() => setIsListAdding(false)}
                            callback={addList}
                        />
                    </div>

                    : <h3 className='AddList AddListHeader' onClick={() => setIsListAdding(true)}>Add list</h3>
                }

            </div>
        </div>
    )
}

export default Board