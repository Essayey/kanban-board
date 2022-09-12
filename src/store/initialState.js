export const initialState = {
    boards: [{
        name: 'Board #1',
        lists: [{
            cards: [{
                title: '1',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '2',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },
            {
                title: '3',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            },],
            listName: "List 1"
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
            listName: "List 1"
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