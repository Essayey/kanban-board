import React from 'react'

const ContextMenu = React.forwardRef(({ children, left, top }, ref) => {
    return (
        <div ref={ref} style={{ left: left, top: top }} className='ContextMenu'>
            <div className='ContextMenu__inner'>
                {children}
            </div>
        </div>
    )
})

export default ContextMenu