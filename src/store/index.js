import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState } from './initialState';
import { createReducer } from '@reduxjs/toolkit';
import ContextMenu from '../components/ContextMenu';

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
const INSERT_CARD = 'INSERT_CARD';
const MOVE_CARD = 'MOVE_CARD';

const WRITE_DROP_SRC = 'WRITE_DROP_SRC';
const WRITE_DROP_DEST = 'WRITE_DROP_DEST';

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
    builder.addCase(INSERT_CARD, (state, action) => {
        state.boards[action.payload.boardId]
            .lists[action.payload.listId]
            .cards.splice(action.payload.cardId, 0, action.payload.card);
    })

    builder.addCase(MOVE_CARD, (state, action) => {
        const destCards = state.boards[action.payload.destBoardId]
            .lists[action.payload.destListId]
            .cards;
        const srcCards = state.boards[action.payload.srcBoardId]
            .lists[action.payload.srcListId]
            .cards;


        if (action.payload.srcListId == action.payload.destListId
            && action.payload.srcBoardId == action.payload.destBoardId) {
            const card = srcCards[action.payload.srcCardId];

            if (action.payload.destCardId !== destCards.length) {
                destCards.splice(action.payload.destCardId, 0, card)
            }
            else {
                destCards.push(card);
            }

            if (action.payload.destCardId > action.payload.srcCardId) {
                srcCards.splice(action.payload.srcCardId, 1);
            }
            else {
                srcCards.splice(action.payload.srcCardId + 1, 1);
            }

            return;
        }

        if (action.payload.destCardId - 1 !== destCards.length) {
            destCards.splice(action.payload.destCardId, 0,
                srcCards[action.payload.srcCardId]);
        }
        else {
            destCards.push(srcCards[action.payload.srcCardId])
        }
        srcCards.splice(action.payload.srcCardId, 1);
    })


    builder.addCase(WRITE_DROP_DEST, (state, action) => {
        state.dropCardState.destCardId = action.payload.cardId;
        state.dropCardState.destListId = action.payload.listId;
    })
    builder.addCase(WRITE_DROP_SRC, (state, action) => {
        state.dropCardState.boardId = action.payload.boardId;
        state.dropCardState.srcCardId = action.payload.cardId;
        state.dropCardState.srcListId = action.payload.listId;
    })
})


export const store = createStore(boardReducer, composeWithDevTools());

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
export const doInsertCard = payload => {
    return { type: INSERT_CARD, payload }
}
export const doMoveCard = payload => {
    return { type: MOVE_CARD, payload }
}

export const doWriteDropSrc = payload => {
    return { type: WRITE_DROP_SRC, payload }
}

export const doWriteDropDest = payload => {
    return { type: WRITE_DROP_DEST, payload }
}