import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { doAddCard } from '../store';

const AddCardForm = ({ boardId, listId, setIsCardAdding, listScrollRef }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState();

    const textAreaRef = useRef();
    const formRef = useRef();

    const resizeTextArea = () => {
        textAreaRef.current.style = 'height: auto';
        textAreaRef.current.style = 'height:' + (textAreaRef.current.scrollHeight) + 'px';
    }

    const addCard = (text, boardId, listId, e) => {
        e.preventDefault();
        if (value !== '') {
            dispatch(doAddCard({ boardId, listId, text }));
            setValue('');
            textAreaRef.current.style = 'height: auto';
        }
    }

    const onInput = e => {
        setValue(e.target.value);
        resizeTextArea();
        listScrollRef.current.scrollTop = listScrollRef.current.scrollHeight;
    }
    const submitOnEnter = e => {
        if (e.which === 13) {
            e.preventDefault();
            formRef.current.requestSubmit();
        }
    }
    const onCloseForm = () => {
        setIsCardAdding(false);
        setValue('');
    }
    return (
        <form ref={formRef} onSubmit={e => addCard(value, 0, listId, e)}>
            <textarea
                placeholder='Type a title of the card'
                ref={textAreaRef}
                autoFocus
                value={value}
                onChange={onInput}
                onKeyPress={submitOnEnter}
                type="text"
                className='input' />
            <div className='Card__buttons'>
                <button type='submit' className='btn'>Add card</button>
                <div onClick={onCloseForm} className='closeIcon'></div>
            </div>
        </form>
    )
}

export default AddCardForm