import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import Banner from '../components/Banner';
import BookCard from '../components/BookCard';

const Home = () => {

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentSearchTerm, setCurrentSearchTerm] = useState('');
    const [currentOffset, setCurrentOffset] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);
    
    const isInitialMount = useRef(true);
    
    const booksPerPage = 10;
    
    const fetchBooks = async (isNewSearch = true) => {
        try {
            setIsLoading(true);
            setIsLoadingMore(true);
            
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
                author: book.author_name ? book.author_name[0] : 'Auteur inconnu',
                year: book.first_publish_year || 'Année inconnue',
                coverUrl: book.cover_i 
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : null,
                url: `https://openlibrary.org${book.key}`
            }));
            
            setBooks(prevBooks => isNewSearch ? newBooks : [...prevBooks, ...newBooks]);
            setTotalResults(data.numFound);
            setError(null);
        } catch (err) {
            setError("Unable to load books. Please try again later.");
            console.error("Error loading books:", err);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false)
        }
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
     
            let isMounted = true;
            
            const initialFetch = async () => {
                if (isMounted) {
                    await fetchBooks(true);
                }
            };
            
            initialFetch();
            
            return () => {
                isMounted = false;
            };
        }
    }, []);
   
    const handleRefresh = () => {
        fetchBooks(true);
    };
    
    const handleLoadMore = () => {
        fetchBooks(false);
    };
    
    const hasMoreBooks = currentOffset + booksPerPage < totalResults;

    return (
        <div className='bg-persian-green/20 h-auto'>
            <Banner/>

            <div className='grid grid-cols-2 gap-2 max-w-[60vw] justify-center mx-auto my-4'>
                {books.map((book) => (
                    <BookCard key={book.id} book={book}/>
                    ))}
            </div>
            <div className='grid grid-cols-2 gap-2 max-w-[20vw] mx-auto my-8'>
                <button className='btn rounded-full bg-pacific-cyan text-white hover:bg-midnight-green' onClick={handleRefresh} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Refresh'}
                </button>

                {hasMoreBooks && (
                    <button className='btn rounded-full bg-pacific-cyan text-white hover:bg-midnight-green' onClick={handleLoadMore} disabled={isLoadingMore}>
                        {isLoadingMore ? 'Loading...' : 'Load More'}
                    </button>
                )}
            </div>
            <footer className="footer sm:footer-horizontal footer-center bg-persian-green text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Lauriane</p>
                </aside>
            </footer>
        </div>

        
    );
};

export default Home;