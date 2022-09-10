import React, { useRef } from 'react'
import { useOutsideCallback } from '../../../hooks/useOutsideCallback';
import { useEscapeCallback } from '../../../hooks/useEscapeCallback';
import styles from './Modal.module.css';

const Modal = ({ children, closeCallback }) => {
    const closeRef = useRef();

    useOutsideCallback(closeCallback, closeRef);
    useEscapeCallback(closeCallback);

    return (
        <div className={styles.ModalContainer}>
            <div ref={closeRef} className={styles.ModalInner}>
                {children}
            </div>
        </div>
    )
}

export default Modal