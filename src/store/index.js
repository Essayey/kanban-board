import { applyMiddleware, createStore } from 'redux';
import { logging } from './middleware';
import { initialState } from './initialState';
import { createReducer } from '@reduxjs/toolkit';

const CREATE_BOARD = 'CREATE_BOARD';
const RENAME_BOARD = 'RENAME_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';
const ADD_LIST = 'ADD_LIST';
const RENAME_LIST = 'RENAME_LIST';
const DELETE_LIST = 'DELETE_LIST';
const ADD_CARD = 'ADD_CARD';
const EDIT_CARD_TITLE = 'EDIT_CARD_TITLE';
const EDIT_CARD_DESCRIPTION = 'EDIT_CARD_DESCRIPTION';
const DELETE_CARD = 'DELETE_CARD';

const boardReducer = createReducer(initialState, builder => {
    builder.addCase(ADD_LIST, (state, action) => {
        state.boards[action.payload.boardId].lists.push(
            {
                cards: [],
                listName: action.payload.listName
            }
        )
    })

    builder.addCase(RENAME_LIST, (state, action) => {
        state.boards[action.payload.boardId]
            .lists[action.payload.listId].listName = action.payload.newName;
    })

    builder.addCase(DELETE_LIST, (state, action) => {
        state.boards[action.payload.boardId]
            .lists.splice(action.payload.listId, 1);
    })

    builder.addCase(ADD_CARD, (state, action) => {
        state.boards[action.payload.boardId]
            .lists[action.payload.listId].cards.push(
                {
                    title: action.payload.text,
                    description: ''
                }
            )
    })

    builder.addCase(EDIT_CARD_TITLE, (state, action) => {
        state.boards[action.payload.boardId]
            .lists[action.payload.listId]
            .cards[action.payload.cardId].title = action.payload.newText;
    })

    builder.addCase(EDIT_CARD_DESCRIPTION, (state, action) => {
        state.boards[action.payload.boardId]
            .lists[action.payload.listId]
            .cards[action.payload.cardId].description = action.payload.newDescription;
    })

    builder.addCase(DELETE_CARD, (state, action) => {
        state.boards[action.payload.boardId]
            .lists[action.payload.listId]
            .cards.splice(action.payload.cardId, 1)
    })
})


export const store = createStore(boardReducer, applyMiddleware(logging));

export const doCreateBoard = payload => {
    return { type: CREATE_BOARD, payload }
}
export const doRenameBoard = payload => {
    return { type: RENAME_BOARD, payload }
}
export const doDeleteBoard = payload => {
    return { type: DELETE_BOARD, payload }
}
export const doAddList = payload => {
    return { type: ADD_LIST, payload }
}
export const doRenameList = payload => {
    return { type: RENAME_LIST, payload }
}
export const doDeleteList = payload => {
    return { type: DELETE_LIST, payload }
}
export const doAddCard = payload => {
    return { type: ADD_CARD, payload }
}
export const doEditCardTitle = payload => {
    return { type: EDIT_CARD_TITLE, payload }
}
export const doEditCardDescription = payload => {
    return { type: EDIT_CARD_DESCRIPTION, payload }
}
export const doDeleteCard = payload => {
    return { type: DELETE_CARD, payload }
}
