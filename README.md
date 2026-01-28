# DoneThat

A clean and simple TODO app with automatic priority shuffling.

## Features

- Add tasks with custom priorities
- Automatic task reordering based on priority (lower number = higher importance)
- Visual indicators for missing priority levels
- Modern, responsive UI built with React and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd donethat-priority-tasks-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8081`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Routing

## How It Works

Tasks are automatically sorted by priority. When you add a task with a priority number, it will be inserted in the correct position based on its priority level. Lower priority numbers indicate higher importance and appear first in the list.
