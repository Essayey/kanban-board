import React, { useEffect, useRef, useState } from 'react'
import { useOutsideCallback } from '../hooks/useOutsideCallback';
import { useEscapeCallback } from '../hooks/useEscapeCallback';
import { resizeTextArea, submitOnEnter } from '../utils';
import Button from './UI/Button';

const TextareaForm = ({
    closeNotSubmitting,
    hasCloseBtn,
    closeAfterSubmit,
    buttonText,
    placeholder,
    closeFormCallback,
    callback,
    initialValue,
    listScrollRef
}) => {
    const [value, setValue] = useState(initialValue || '');

    const textAreaRef = useRef();
    const formRef = useRef();

    // Set cursor at the end of the text and resize 
    useEffect(() => {
        textAreaRef.current.setSelectionRange(
            textAreaRef.current.value.length, textAreaRef.current.value.length
        );
        resizeTextArea(textAreaRef);
    }, [])

    const onCloseForm = () => {
        closeFormCallback();
    }

    useOutsideCallback(closeNotSubmitting ? () => { } : onCloseForm, formRef);
    useEscapeCallback(closeNotSubmitting ? () => { } : onCloseForm);

    const submit = e => {
        e.preventDefault();
        if (value !== '') {
            callback(value);
            setValue('');
            textAreaRef.current.style = 'height: auto';
        }
        if (closeAfterSubmit) closeFormCallback();
    }

    const onInput = e => {
        setValue(e.target.value);
        resizeTextArea(textAreaRef);
        if (listScrollRef) listScrollRef.current.scrollTop = listScrollRef.current.scrollHeight;
    }

    return (
        <form ref={formRef} onSubmit={submit}>
            <textarea
                placeholder={placeholder}
                ref={textAreaRef}
                autoFocus
                value={value}
                onChange={onInput}
                onKeyPress={e => submitOnEnter(e, formRef)}
                type="text"
                className='input' />
            <div className='Card__buttons'>
                <Button type='submit' variant='primary'>{buttonText}</Button>
                {hasCloseBtn
                    ? <div onClick={onCloseForm} className='closeIcon'></div>
                    : null
                }

            </div>
        </form>
    )
}

export default TextareaForm