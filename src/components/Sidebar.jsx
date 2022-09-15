import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ boards }) => {
    return (
        <div className='Sidebar'>
            <div className='Sidebar__inner'>
                <div className='Sidebar__title'>
                    <h2>My boards</h2>
                    <button>Add board</button>
                </div>
                <div className="Sidebar__boards">
                    {boards.map((board, index) =>
                        <div className="Sidebar__link">
                            <Link to={`boards/${index}`} key={board + index}>
                                {board} <br />
                            </Link>
                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar