export const initialState = {
    boards: [{
        name: 'Board #1',
        lists: [{
            cards: [{
                title: 'Welcome to Kanban Board :)',
                description: 'Learn Redux thunk'
            },
            {
                title: 'You can click on this card to edit',
                description: 'Build server and database'
            },
            {
                title: 'You can Drag and Drop this card.',
                description: ''
            }, {
                title: 'Also you can right click on cards to open context menu',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            }],
            listName: "Todo"
        }, {
            cards: [{
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },],
            listName: "Doing"
        }, {
            cards: [{
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },],
            listName: "Done"
        }]
    },
    {
        name: 'Board #2',
        lists: [{
            cards: [{
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quisquam.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quisquam.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            }],
            listName: "List 1"
        }]
    }
    ],
    dropCardState: {
        srcCardId: null,
        srcListId: null,
        dragging: false,
    }
}


export const initialStateDev = {
    boards: [{
        name: 'Board #1',
        lists: [{
            cards: [{
                title: '1',
                description: 'Learn Redux thunk'
            },
            {
                title: '2',
                description: 'Build server and database'
            },
            {
                title: '3',
                description: ''
            },],
            listName: "Todo"
        }, {
            cards: [{
                title: '4',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '5',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '6',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '7',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '8',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },],
            listName: "Doing"
        }, {
            cards: [{
                title: '4',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '5',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '6',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '7',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '8',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },],
            listName: "Done"
        }]
    },
    {
        name: 'Board #2',
        lists: [{
            cards: [{
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quisquam.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quisquam.',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            }],
            listName: "List 1"
        }]
    }
    ],
    dropCardState: {
        boardId: 0,
        srcCardId: 0,
        srcListId: 0,
        destCardId: 0,
        destListId: 0
    }
}