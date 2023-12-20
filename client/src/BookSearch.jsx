import { useState } from 'react';
import { Button, TextField } from '@deque/cauldron-react';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const searchBooks = async () => {
        if (!query) {
            alert('Please enter a search query.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/search?query=${query}`);
            const data = await response.json();
            setBooks(data.books);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <TextField
                label="Search for books"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={searchBooks}>Search</Button>
            <div>
                {books.map((book, index) => (
                    <div key={index}>
                        {book.authors ? book.authors : 'Author Unknown'} - {book.title ? book.title : 'Title Unknown'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookSearch;
