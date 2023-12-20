# Book Search App

## Description

The Book Search App is a web application that allows users to search for books using the Google Books API. This app is built with React and Node.js, utilizing the Cauldron design system to create an accessible and responsive user interface.

## Features

- **Pagination**: Displays 10 book results per page.
- **Book Information**: Each result shows book titles and authors. Clicking on a book expands its description.
- **Additional Data**:
  - Total number of search results.
  - The most common author across results.
  - Oldest and newest publication dates within search results.
  - Server response time for API requests.
- **Cauldron Design System**: The UI is built using Cauldron, Deque’s own React component library, focusing on accessibility.
- **Responsive Design**: The UI is responsive and works on various screen sizes.

## Technology Stack

- **Frontend**: React (Vite) with Cauldron for UI components
- **Backend**: Node.js (Express)
- **API**: Google Books API

## Prerequisites

Before running this application, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- Setting Up the Google API Key

### Setting Up the Google API Key

The application requires a valid Google Books API key to fetch book data. To set this up:

1. Obtain a Google API key:
   - Visit the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Navigate to "APIs & Services" > "Credentials".
   - Click on "Create Credentials" and select "API key". 

2. Add the API key to your server environment:
   - In the `server` directory of your project, create a file named `.env`.
   - Add your Google API key to this file as follows:
     ```
     GOOGLE_BOOKS_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key_here` with the actual API key you obtained.

## Installation

1. Clone the repository:
  ```
  git clone https://github.com/harsha-sam/book-search.git
  ```
2. Navigate to the project directory:
  ```
  cd book-search
  ```
4. Install dependencies for both server and client:
  ```
  npm run install
  ```

## Running the Application

To run both the client and server concurrently:

This command will start the server on `http://localhost:3000` and the client on `http://localhost:5173` (or the next available port if 5173 is occupied).

## Usage

1. Open a web browser and navigate to `http://localhost:5173`.
2. Use the search bar to find books. Results will appear below.
3. Click on any book to view more details.
4. Use the pagination controls to navigate through pages of results.

## Author

Harsha
