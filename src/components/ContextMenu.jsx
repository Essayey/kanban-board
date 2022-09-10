import React from 'react'

const ContextMenu = ({ children, left, top }) => {
    return (
        <div style={{ left: left, top: top }} className='ContextMenu'>
            <div className='ContextMenu__inner'>
                {children}
            </div>
        </div>
    )
}

export default ContextMenu