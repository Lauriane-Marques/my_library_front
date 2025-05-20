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
                <button className="btn btn-primary">Add to my list</button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;