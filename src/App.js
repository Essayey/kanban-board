import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { doAddCard, doAddList, doCreateBoard, doDeleteBoard, doDeleteCard, doDeleteList, doEditCard, doRenameBoard, doRenameList } from './store';
import { useState } from 'react';

function App() {
    const dispatch = useDispatch();
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');

    const createBoard = boardName => {
        dispatch(doCreateBoard({ boardName }));
    }

    const renameBoard = (newName, boardId) => {
        dispatch(doRenameBoard({ newName, boardId }));
    }

    const deleteBoard = boardId => {
        dispatch(doDeleteBoard({ boardId }));
    }

    const addList = (listName, boardId) => {
        dispatch(doAddList({ listName, boardId }))
    }

    const renameList = (newName, boardId, listId) => {
        dispatch(doRenameList({ newName, boardId, listId }))
    }

    const deleteList = (boardId, listId) => {
        dispatch(doDeleteList({ boardId, listId }));
    }

    const addCard = (text, boardId, listId) => {
        dispatch(doAddCard({ boardId, listId, text }));
    }

    const editCard = (newText, boardId, listId, cardId) => {
        dispatch(doEditCard({ boardId, listId, cardId, newText }));
    }

    const deleteCard = (boardId, listId, cardId) => {
        dispatch(doDeleteCard({ boardId, listId, cardId }))
    }

    return (
        <div>
            <input placeholder='Name' value={value1} onChange={e => setValue1(e.target.value)}></input>
            <input placeholder='boardId' value={value2} onChange={e => setValue2(e.target.value)}></input>
            <input placeholder='listId' value={value3} onChange={e => setValue3(e.target.value)}></input>
            <input placeholder='cardId' value={value4} onChange={e => setValue4(e.target.value)}></input>
            <br />
            <button onClick={() => createBoard(value1)}>Create board</button>
            <button onClick={() => renameBoard(value1, Number(value2))}>Rename board</button>
            <button onClick={() => deleteBoard(Number(value2))}>Delete board</button>
            <br />
            <button onClick={() => addList(value1, Number(value2))}>Add list</button>
            <button onClick={() => renameList(value1, Number(value2), Number(value3))}>Rename list</button>
            <button onClick={() => deleteList(Number(value2), Number(value3))}>Delete list</button>
            <br />
            <button onClick={() => addCard(value1, Number(value2), Number(value3))}>Add card</button>
            <button onClick={() => editCard(value1, Number(value2), Number(value3), Number(value4))}>Edit card</button>
            <button onClick={() => deleteCard(Number(value2), Number(value3), Number(value4))}>Delete card</button>
        </div>
    );
}

export default App;
