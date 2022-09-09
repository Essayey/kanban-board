import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { doAddCard, doAddList, doCreateBoard, doDeleteBoard, doDeleteCard, doDeleteList, doEditCard, doRenameBoard, doRenameList } from './store';
import { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Board from './components/Board';
import CardModal from './components/CardModal';

function App() {
    const dispatch = useDispatch();
    const boards = useSelector(state => state.boards);
    const boardsNames = boards.map(board => board.name);
    const boardRef = useRef();

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



    const deleteList = (boardId, listId) => {
        dispatch(doDeleteList({ boardId, listId }));
    }



    return (
        <div className='App'>
            <BrowserRouter>
                <Sidebar boards={boardsNames} />
                <Routes>
                    <Route path='boards/:boardId' element={<Board board={boards[0]} />}>
                        <Route path=':listId/:cardId' element={<CardModal

                            title='Card 1'
                            text='Lorem ipsum dolor sit amet, 
            consectetur adipisicing elit. Voluptates, nesciunt!'/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
