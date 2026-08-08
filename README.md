# Book Directory

A book-discovery interface powered by the Google Books API.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Create a Google API key, enable the Books API, and set `VUE_APP_GOOGLE_BOOKS_API_KEY`.
3. Restart the development server after changing environment variables.

```bash
npm install
npm run serve
```

The API key is used for project identification and quota. Restrict production keys to the deployed website and the Google Books API.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
