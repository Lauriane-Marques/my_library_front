import React from 'react';

function BookCard({book}) {
    return (
        <div className="card card-side bg-base-100 shadow-md max-w-[30vw] p-1 mb-1">
            <figure className='object-scale-down rounded-sm'>
                <img
                src={book.coverUrl}
                alt="Book cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <h3>by {book.author}</h3>
                <div className="card-actions justify-end">
                <div className="dropdown dropdown-center">
                    <div tabIndex={0} role="button" className="btn m-1">Add to my list</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li><a>Want to read</a></li>
                        <li><a>Reading</a></li>
                        <li><a>Read</a></li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;