# Book Directory

Book Directory is a responsive book-discovery application powered by the Google Books API. Search by title, author, ISBN, or subject; filter and sort the results; view book details; and save favorites locally in the browser.

- **Version:** 0.1.0
- **Latest update:** August 8, 2026
- **Live app:** [redesigned-lamp-six.vercel.app](https://redesigned-lamp-six.vercel.app/)

## Features

- Search the Google Books catalog
- Sort results by relevance or publication date
- Filter by e-book and preview availability
- View covers, authors, publication dates, descriptions, and book metadata
- Save favorite books with browser local storage
- Responsive layouts for desktop and mobile
- Explicit loading, empty-result, and API-error states

## Tech stack

| Technology | Version | Purpose |
| --- | --- | --- |
| Vue | 2.7.14 | User interface framework |
| TypeScript | 4.5.5 | Static typing |
| Vue Router | 3.6.5 | Client-side routing |
| Vuex | 3.6.2 | Application state management |
| Vuex Module Decorators | 2.0.0 | Typed modular Vuex stores |
| Axios | 1.4.0 | Google Books API requests |
| Bootstrap | 5.3.1 | Base UI utilities |
| BootstrapVue | 2.23.1 | Vue UI components |
| Sass | 1.102.0 | Component and responsive styling |
| Vue CLI | 5.0.8 | Local development and production builds |
| Google Books API | v1 | Book search and metadata |
| Vercel | Node.js 24.x | Production hosting and builds |

## Requirements

- Node.js 20 or newer; production currently builds with Node.js 24.x
- npm
- A Google Cloud API key with the Books API enabled

## Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/whoisnaisu/redesigned-lamp.git
cd redesigned-lamp
```

Install the dependencies:

```bash
npm install
```

If PowerShell blocks `npm.ps1`, use the Windows command wrapper:

```powershell
npm.cmd install
```

## Environment setup

Copy the example environment file:

```powershell
Copy-Item .env.example .env.local
```

Add your Google Books API key to `.env.local`:

```env
VUE_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

Enable the **Books API** in Google Cloud and restrict the key to that API and your allowed website origins. `.env.local` is excluded from Git and must never be committed.

## Running locally

Start the development server with hot reload:

```bash
npm run serve
```

On Windows PowerShell with script execution disabled:

```powershell
npm.cmd run serve
```

The development app is normally available at [http://localhost:8080/](http://localhost:8080/).

## Production build

Create an optimized build in `dist/`:

```bash
npm run build
```

## Deployment

The production application is deployed through Vercel from the repository's `main` branch.

Vercel must define the following sensitive environment variable for Production and Preview:

```text
VUE_APP_GOOGLE_BOOKS_API_KEY
```

Environment variables are embedded during a Vue CLI build, so redeploy the project after adding or changing the key.

## API-key safety

This is a browser application, so build-time environment variables are present in the downloaded JavaScript bundle. Protect the Google key with API restrictions and HTTP referrer restrictions; do not rely on the environment variable to make a browser key secret.
