# Flashcards App

A modern, minimalist flashcards application built with **Vite + React**.

## Technologies Used

* **Vite (React)** for fast development and build times
* **React 18 (Hooks)** for clean, component-based logic
* **Pure CSS**, fully responsive, supports light/dark themes
* **LocalStorage** for saving user data locally

## Features

* **Flashcard Management:** Add, edit, and delete cards (saved in browser)
* **Study Mode:** Flip cards to learn, supports shuffle order
* **Quiz Mode:**

  * Multiple choice (4 options) with progress bar, results, Retry, and Review Incorrect
  * Written answers (type your response) with instant grading, results, Retry, and Review Incorrect
* **Theme Toggle:** Switch between Light/Dark mode
* **Responsive Design:** Works beautifully on mobile without overflow issues

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Project Structure

* `src/App.jsx`: Main app logic, handles app state and mode switching
* `src/components/CardList.jsx`: Card CRUD operations and quiz mode selection
* `src/components/StudyMode.jsx`: Flashcard study mode
* `src/components/QuizMode.jsx`: Multiple-choice quiz mode
* `src/components/WrittenMode.jsx`: Written-answer quiz mode
* `src/App.css`: Main styling (variables, theme, responsive design)
* `src/index.css`: Base layout and scroll behavior

## Notes

* Flashcard data is stored in LocalStorage under key `flashcards`
* Theme preference is stored in LocalStorage under key `theme`
* Color themes and variables can be easily customized in `:root` inside `src/App.css`
