# Overview

This is a Tic Tac Toe app that includes a NextJS frontend and Ruby on Rails backend.

## To Run This Program

To run this program, you need to have both the frontend and backend folders open syncronously.
> **Note:** to avoid conflict between NextJS and the Rails server, the Rails server must be run on port 3000, and NextJS must be run on port 3001.

**To run the backend run:**

```
cd backend
bundle install
rails server
```

**To run the frontend run:**

```
cd frontend
npm install
npm run dev -- -p 3001
```
