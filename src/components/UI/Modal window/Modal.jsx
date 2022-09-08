import React, { Children } from 'react'
import styles from './Modal.module.css';

const Modal = ({ children, closeRef }) => {

    return (
        <div className={styles.ModalContainer}>
            <div ref={closeRef} className={styles.ModalInner}>
                {children}
            </div>
        </div>
    )
}

export default Modal