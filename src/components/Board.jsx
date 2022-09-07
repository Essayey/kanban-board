import React from 'react'
import List from './List'

const Board = ({ board }) => {

    return (
        <div className='Board'>
            <div className='Board__inner'>
                {board.lists.map((list, index) => <List key={list.listName + index} cards={list.cards} listName={list.listName} listId={index} />)}
            </div>
        </div>
    )
}

export default Board