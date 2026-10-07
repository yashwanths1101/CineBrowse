# CineBrowse

A responsive single-page movie and TV discovery platform built with **React** and the **TMDB API**.

## Features

- Movie and TV show discovery powered by TMDB
- Multiple categories including Top 10, Trending, Top Rated, Comedy, and Action
- Movie and TV show search with 300 ms debouncing
- Dynamic movie and TV show detail pages
- Client-side routing with React Router
- Infinite loading on the Browse page
- Shimmer loading UI

## Tech Stack

- React
- JavaScript
- React Router
- Tailwind CSS
- TMDB API

## Screenshots

### Home

![Home](./screenshots/home.png)

### Browse

![Browse](./screenshots/browse.png)

### Movie Details

![Movie Details](./screenshots/movie-details.png)

### Search

![Search](./screenshots/search.png)

## Getting Started

### Prerequisites

- Node.js
- npm
- TMDB API Read Access Token (Bearer token)

### Installation

Clone the repository:

    git clone https://github.com/yashwanths1101/CineBrowse.git
    cd CineBrowse

Install dependencies:

    npm install

### Environment Variables

Create a `.env` file in the project root:

    VITE_TMDB_TOKEN=your_tmdb_bearer_token

## Troubleshooting

### TMDB API / Website Not Loading

If the website is not working as expected, the issue may be related to the network's DNS configuration or routing.

Try switching your network's DNS to a public DNS provider:

**Cloudflare DNS**

- Preferred DNS: `1.1.1.1`
- Alternate DNS: `1.0.0.1`

**Google DNS**

- Preferred DNS: `8.8.8.8`
- Alternate DNS: `8.8.4.4`
