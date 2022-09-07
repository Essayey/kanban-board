import { applyMiddleware, createStore } from 'redux';
import { logging } from './middleware';

const initialState = {
    boards: [{
        name: 'Board #1',
        lists: [{
            cards: [{ text: "Card 1" },
            { text: "Card 2" },
            { text: "Card 3" }],
            listName: "List 1"
        }]
    },
    {
        name: 'Board #2',
        lists: [{
            cards: [{ text: "Card 1" },
            { text: "Card 2" },
            { text: "Card 3" }],
            listName: "List 1"
        }]
    }
    ]
}


const CREATE_BOARD = 'CREATE_BOARD';
const RENAME_BOARD = 'RENAME_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';
const ADD_LIST = 'ADD_LIST';
const RENAME_LIST = 'RENAME_LIST';
const DELETE_LIST = 'DELETE_LIST';
const ADD_CARD = 'ADD_CARD';
const EDIT_CARD = 'EDIT_CARD';
const DELETE_CARD = 'DELETE_CARD';


const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BOARD:
            return { boards: [...state.boards, { name: action.payload.boardName, lists: [] }] }
        case RENAME_BOARD:
            return {
                boards: state.boards.map((board, index) => {
                    if (index === action.payload.boardId) {
                        return { name: action.payload.newName, lists: board.lists }
                    }
                    return board;
                })
            }
        case DELETE_BOARD:
            return {
                boards: state.boards.filter((_, index) => index !== action.payload.boardId)
            }

        case ADD_LIST:
            return {
                boards: state.boards.map((board, index) => {
                    if (index === action.payload.boardId) {
                        return {
                            name: board.name,
                            lists: [...board.lists,
                            { cards: [], listName: action.payload.listName }]
                        }
                    }
                    return board;
                })
            }
        case RENAME_LIST:
            return {
                boards: state.boards.map((board, index) => {
                    if (index === action.payload.boardId) {
                        return {
                            name: board.name,
                            lists: [...board.lists,
                            { cards: [], listName: action.payload.listName }]
                        }
                    }
                    return board;
                })
            }
        case DELETE_LIST:
            return {
                boards: state.boards.map((board, boardId) => {
                    if (boardId === action.payload.boardId) {
                        return {
                            name: board.name,
                            lists: board.lists.filter((_, listId) => listId !== action.payload.listId)
                        }
                    }
                    return board;
                })
            }
        case ADD_CARD:
            return {
                boards: state.boards.map((board, boardId) => {
                    if (boardId === action.payload.boardId) {
                        return {
                            name: board.name,
                            lists: board.lists.map((list, listId) => {
                                if (listId === action.payload.listId) {
                                    return { cards: [...list.cards, { text: action.payload.text }] }
                                }
                                return list;
                            })
                        }
                    }
                    return board;
                })
            }

        case EDIT_CARD:
            return {
                boards: state.boards.map((board, boardId) => {
                    if (boardId === action.payload.boardId) {
                        return {
                            name: board.name,
                            lists: board.lists.map((list, listId) => {
                                if (listId === action.payload.listId) {
                                    return {
                                        cards: list.cards.map((card, cardId) => {
                                            if (cardId === action.payload.cardId) {
                                                return action.payload.newText;
                                            }
                                            return card;
                                        })
                                    }
                                }
                                return list;
                            })
                        }
                    }
                    return board;
                })
            }

        case DELETE_CARD:
            return {
                boards: state.boards.map((board, boardId) => {
                    if (boardId === action.payload.boardId) {
                        return {
                            name: board.name,
                            lists: board.lists.map((list, listId) => {
                                if (listId === action.payload.listId) {
                                    return {
                                        cards: list.cards.filter((_, cardId) => cardId !== action.payload.cardId)
                                    }
                                }
                                return list;
                            })
                        }
                    }
                    return board;
                })
            }
        default:
            return state;
    }
}

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
export const doEditCard = payload => {
    return { type: EDIT_CARD, payload }
}
export const doDeleteCard = payload => {
    return { type: DELETE_CARD, payload }
}
