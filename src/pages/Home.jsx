import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Banner from '../components/Banner';

const Home = () => {

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSearchTerm, setCurrentSearchTerm] = useState('');
    const [currentOffset, setCurrentOffset] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);
    
    const booksPerPage = 10;
    
    const fetchBooks = async (isNewSearch = true) => {
        try {
        setIsLoading(true);
        
        let searchTerm = currentSearchTerm;
        let offset = currentOffset;
        
        if (isNewSearch) {
            const searchTerms = ['love', 'time', 'world', 'life', 'history', 'art', 'science'];
            searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
            offset = Math.floor(Math.random() * 100);
            
            setCurrentSearchTerm(searchTerm);
            setCurrentOffset(offset);
        } else {
            offset = currentOffset + booksPerPage;
            setCurrentOffset(offset);
        }
        
        const response = await fetch(
            `https://openlibrary.org/search.json?q=${searchTerm}&limit=${booksPerPage}&offset=${offset}`
        );
        
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }
        
        const data = await response.json();
        
        const newBooks = data.docs.map(book => ({
            id: book.key,
            title: book.title,
            author: book.author_name ? book.author_name[0] : 'unknown author',
            year: book.first_publish_year || 'unknown year',
            coverUrl: book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
            url: `https://openlibrary.org${book.key}`
        }));
        
        setBooks(prevBooks => isNewSearch ? newBooks : [...prevBooks, ...newBooks]);
        setTotalResults(data.numFound);
        setError(null);
        } catch (err) {
        setError("Impossible de charger les livres. Please try again later.");
        console.error("Erreur lors du chargement des livres:", err);
        } finally {
        setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(true);
    }, []);
   
    const handleRefresh = () => {
        fetchBooks(true);
    };
    
    const handleLoadMore = () => {
        fetchBooks(false);
    };
    
    const hasMoreBooks = currentOffset + booksPerPage < totalResults;

    return (
        <div>
            <Banner/>

            {books.map((book) => (
                <div>
                    <h1>{book.title}</h1>
                    <h2>{book.author}</h2>
                </div>
            ))}
            <h1 className=''>Hello</h1>
            <p><Link className='link-inscription' to="/signup">Sign up</Link></p>
            <p><Link to="/login">Register</Link></p>
        </div>
    );
};

export default Home;