require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS to allow cross-origin requests
app.use(cors());

// Search route
app.get('/search', async (req, res) => {
    const { query, startIndex = 0 } = req.query;
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    try {
        const start = new Date();
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=10&key=${apiKey}`;
        const response = await axios.get(url);
        const responseTime = new Date() - start;
        const data = response.data;
        const books = data.items.map(item => ({
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            description: item.volumeInfo.description || 'No description available',
            imgLink: item.volumeInfo.imageLinks.smallThumbnail,
            previewLink: item.volumeInfo.previewLink,
            publishedDate: item.volumeInfo.publishedDate
        }));

        const totalResults = data.totalItems;
        const mostCommonAuthor = findMostCommonAuthor(books);
        const { oldestPublicationDate, newestPublicationDate } = findPublicationDates(books);
        res.json({
                totalResults,
                mostCommonAuthor,
                oldestPublicationDate,
                newestPublicationDate,
                responseTime,
                books
            });
    } catch (error) {
            res.status(500).send('Error occurred while fetching data');
    }
});

function findMostCommonAuthor(books) {
    const authorFrequency = {};
    books.forEach(book => {
        if (book.authors) {
            book.authors.forEach(author => {
                authorFrequency[author] = (authorFrequency[author] || 0) + 1;
            });
        }
    });

    let maxCount = 0;
    let mostCommonAuthor = '';
    for (const author in authorFrequency) {
        if (authorFrequency[author] > maxCount) {
            maxCount = authorFrequency[author];
            mostCommonAuthor = author;
        }
    }

    return mostCommonAuthor;
}

function findPublicationDates(books) {
    let oldestDate = new Date().toISOString().split('T')[0]; // Today's date as the initial value
    let newestDate = '0000-00-00'; // Far past date as the initial value

    books.forEach(book => {
        if (book.publishedDate) {
            if (book.publishedDate < oldestDate) {
                oldestDate = book.publishedDate;
            }
            if (book.publishedDate > newestDate) {
                newestDate = book.publishedDate;
            }
        }
    });

    return {
        oldestPublicationDate: oldestDate,
        newestPublicationDate: newestDate
    };
}

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
