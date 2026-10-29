# Technical Challenge: Posts API

## Overview

Build a Node.js application with Express that consumes a mock API and exposes its data through your own endpoints.

The mock API is [JSONPlaceholder](https://jsonplaceholder.typicode.com/), which provides posts, comments and users. Your API must combine these resources so that every post includes its author and its comments.

You can work locally or on StackBlitz using the Express template.

## Requirements

### 1. Server

Create a Node.js server using Express.

### 2. `GET /posts`

Return the list of all posts. Each post must:

- Include its author.
- Include its comments.
- Match the `Post` shape described in [Response shape](#response-shape).

### 3. `GET /posts/:id`

Return a single post by its ID. The post must:

- Include its author.
- Include its comments.
- Match the `Post` shape described in [Response shape](#response-shape).

### 4. Error handling

Handle errors gracefully, including invalid IDs (non-numeric or non-existent) and network failures when calling the mock API. Respond with an appropriate HTTP status code and a clear error message.

## Response shape

```ts
interface Post {
  id: number
  title: string
  body: string
  author: Author
  comments: Comment[]
}

interface Author {
  name: string
  username: string
  email: string
}

interface Comment {
  id: number
  title: string
  email: string
  body: string
}
```

## Available endpoints

- GET /posts
- GET /posts/:id
- GET /comments
- GET /comments/:id
- GET /users
- GET /users/:id