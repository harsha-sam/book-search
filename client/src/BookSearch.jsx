import { useState, useId } from 'react';
import { Button, TextField, FieldWrap, Pagination, Panel, Loader, Line, Link } from '@deque/cauldron-react';

const originalState = {
        isLoading: false,
        query: '',
        books: [],
        currentPage: 1,
        totalResults: 0,
        commonAuthor: '',
        oldestDate: '',
        newestDate: '',
        responseTime: 0,
        itemsPerPage: 10,
}

const BookSearch = () => {
    const [state, setState] = useState({ ...originalState });
    const id = useId();

    const searchBooks = async (page = 1) => {
        if (!state.query) { 
            setState({ ...originalState })
            return;
        }
        setState(prev => ({ ...prev, isLoading: true, currentPage: page }));

        const startIndex = (page - 1) * state.itemsPerPage;
        try {
            const response = await fetch(`http://localhost:3000/search?query=${state.query}&startIndex=${startIndex}`);
            const data = await response.json();
            setState(prev => ({
                ...prev,
                books: data.books,
                totalResults: data.totalResults,
                commonAuthor: data.mostCommonAuthor,
                oldestDate: data.oldestPublicationDate,
                newestDate: data.newestPublicationDate,
                responseTime: data.responseTime,
                isLoading: false
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const toggleDescription = index => {
        setState(prev => ({
            ...prev,
            books: prev.books.map((book, i) => i === index ? { ...book, showDescription: !book.showDescription } : book)
        }));
    };

    const formatAuthors = authors => {
        if (!authors || authors.length === 0) return 'Author Unknown';
        let authorsFormatted = authors[0] + " "
        for (let i = 1; i < authors.length ; i++) {
            authorsFormatted = authorsFormatted + "[, "
            authorsFormatted =  authorsFormatted + authors[i] + " "
        }
        for (let i = authors.length; i > 0 ; i--) {
            authorsFormatted = authorsFormatted + "]"
        }
        return authorsFormatted;
    };

    return (
        <section className="container" aria-labelledby="search-header">
            <h1 id="search-header">Book Search</h1>
            <FieldWrap>
                <TextField
                    label="Enter book title or author"
                    value={state.query}
                    onChange={(val) => setState(prev => ({ ...prev, query: val }))}
                    onKeyPress={(e) => e.key === 'Enter' && searchBooks(1)}
                />
            </FieldWrap>
            <Button onClick={() => searchBooks(1)} style={{ width: "50%"}}>Search</Button>

            {state.isLoading ? (
                <div aria-live="polite" role="alert">
                    <Loader label="Searching books..." />
                </div>
            ) : (state.totalResults == 0 ? 
                    <div>
                        No books found ! Please use the search
                    </div>
                :
                <div>
                    <article>
                        <p>Total Results: {state.totalResults}</p>
                        <p>Most Common Author: {state.commonAuthor}</p>
                        <p>Oldest Publication Date: {state.oldestDate}</p>
                        <p>Newest Publication Date: {state.newestDate}</p>
                        <p>Server Response Time: {state.responseTime} ms</p>
                        <Line />
                    </article>
                    {state.books.map((book, index) => (
                        <Panel key={index}>
                            <div key={`${id}-${book.title}`} onClick={() => toggleDescription(index)} tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && toggleDescription(index)}>
                                <img src={book.imgLink} alt={`${book.title} thumbnail`} style={{ width: "80px" }} />
                                
                                <p>{`${formatAuthors(book.authors)} - `}
                                    <span style={{ fontWeight: "bold" }}>
                                        {`${book.title || 'Title Unknown'}`}
                                    </span>
                                </p>

                                {book.showDescription &&
                                    <article>
                                        <p>
                                            {book.description}
                                        </p>
                                        <Link
                                            onClick={(e) => e.stopPropagation()}
                                            href={book.previewLink}
                                            target="_blank"
                                        >
                                            Book Preview
                                        </Link>
                                    </article>
                                }
                            </div>
                        </Panel>
                    ))}
                    <Pagination
                    style={{ marginTop: "20px" }}
                    currentPage={state.currentPage}
                    itemsPerPage={state.itemsPerPage}
                    totalItems={state.totalResults}
                    onNextPageClick={() => searchBooks(state.currentPage + 1)}
                    onPreviousPageClick={() => searchBooks(state.currentPage - 1)}
                    onFirstPageClick={() => searchBooks(1)}
                    onLastPageClick={() => searchBooks(Math.ceil(state.totalResults / state.itemsPerPage))}
                    tooltipPlacement="bottom"
                    thin
                    />
                </div>)}
        </section>
    )
};

export default BookSearch;
