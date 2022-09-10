import React from 'react'

const Button = ({ className, onClick, children, variant }) => {
    const color = variant === 'primary' ? '#5757ff' : '#111111aa'
    console.log(color)
    return (
        <button onClick={onClick} style={{ background: color }} type='submit' className={className + ' btn'}>
            {children}
        </button>
    )
}

export default Button