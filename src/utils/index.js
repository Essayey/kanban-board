export const resizeTextArea = textAreaRef => {
    textAreaRef.current.style = 'height: auto';
    textAreaRef.current.style = 'height:' + (textAreaRef.current.scrollHeight) + 'px';
}

export const submitOnEnter = (e, formRef) => {
    if (e.which === 13) {
        e.preventDefault();
        formRef.current.requestSubmit();
    }
}