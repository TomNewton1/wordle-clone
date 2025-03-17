# Wordle Frontend

## Overview

Wordle clone FE built with React and TypeScript.

This should be run with the following Django API: [https://github.com/TomNewton1/wordle-clone-api](https://github.com/TomNewton1/wordle-clone-api)

## Prerequisites

- Node.js (version 18 or higher)
- npm

### Using .nvmrc

If you use `nvm` (Node Version Manager), you can run the following command to use the correct Node.js version specified in the `.nvmrc` file:

```bash
nvm use
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Dependencies

Create a `.env` file based based on the provided .env.example

```bash
cp .env.example .env
```

Update `.env` file with your environment specific variables if required such as different API url.

### 3. Run Development Server

```bash
npm run dev
```

### 4. Run Tests

```bash
npm test
```
