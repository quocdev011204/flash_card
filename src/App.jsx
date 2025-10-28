import './App.css';
import { useEffect, useMemo, useState } from 'react';
import CardList from './components/CardList';
import StudyMode from './components/StudyMode';
import QuizMode from './components/QuizMode';
import WrittenMode from './components/WrittenMode';

const defaultCards = [
  { id: 1, front: 'Hello', back: 'Xin chào' },
  { id: 2, front: 'Apple', back: 'Quả táo' },
  { id: 3, front: 'Dog', back: 'Con chó' },
];

function App() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('flashcards');
    return saved ? JSON.parse(saved) : defaultCards;
  });
  const [mode, setMode] = useState('list'); // list | study | quiz
  const [quizType, setQuizType] = useState('mcq'); // mcq | written
  const [order, setOrder] = useState([]); // shared order of indices
  const [current, setCurrent] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizResult, setQuizResult] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [writtenValue, setWrittenValue] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Helpers
  const shuffle = (arr) => arr.map(v => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r).map(({ v }) => v);

  const buildOrder = (size) => shuffle([...Array(size).keys()]);

  const orderedCards = useMemo(() => {
    if (!cards.length) return [];
    if (!order.length) return cards;
    return order.map(i => cards[i]).filter(Boolean);
  }, [cards, order]);

  // Save to localStorage when cards change
  const saveCards = (newCards) => {
    setCards(newCards);
    localStorage.setItem('flashcards', JSON.stringify(newCards));
  };

  // Theme switch
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Apply theme class to body
  useEffect(() => {
    const lightClass = 'theme-light';
    const darkClass = 'theme-dark';
    document.body.classList.remove(lightClass, darkClass);
    document.body.classList.add(theme === 'light' ? lightClass : darkClass);
  }, [theme]);

  // Add new card
  const addCard = (front, back) => {
    const newCard = { id: Date.now(), front, back };
    saveCards([...cards, newCard]);
  };

  // Delete card
  const deleteCard = (id) => {
    saveCards(cards.filter(card => card.id !== id));
  };

  // Edit card
  const editCard = (id, front, back) => {
    saveCards(cards.map(card => card.id === id ? { ...card, front, back } : card));
  };

  // Study mode startup
  const startStudy = () => {
    setOrder(buildOrder(cards.length));
    setCurrent(0);
    setShowBack(false);
    setMode('study');
  };

  // Study mode: next card
  const nextCard = () => {
    setShowBack(false);
    setCurrent((prev) => (prev + 1) % orderedCards.length);
  };

  // Build multiple-choice options for a list of cards
  const generateQuizData = (list) => {
    if (!list || list.length === 0) return [];
    const backs = list.map(c => c.back);
    return list.map(card => {
      const incorrect = backs.filter(b => b !== card.back);
      const sampled = shuffle(incorrect).slice(0, Math.max(0, 3));
      const options = shuffle([card.back, ...sampled]);
      return { id: card.id, front: card.front, correct: card.back, options };
    });
  };

  // Handle MCQ selection
  const answerMCQ = (selected) => {
    const currentQ = quizData[quizStep];
    const correct = selected === currentQ.correct;
    setQuizResult(prev => [...prev, correct]);
    setQuizStep(prev => prev + 1);
  };

  // Handle written submit
  const submitWritten = () => {
    const currentQ = quizData[quizStep];
    const correct = (writtenValue || '').trim().toLowerCase() === currentQ.correct.trim().toLowerCase();
    setQuizResult(prev => [...prev, correct]);
    setWrittenValue('');
    setQuizStep(prev => prev + 1);
  };

  // Reset quiz using shared order and selected type
  const startQuiz = () => {
    const base = order.length ? orderedCards : shuffle(cards);
    const data = quizType === 'mcq' ? generateQuizData(base) : base.map(c => ({ id: c.id, front: c.front, correct: c.back }));
    setQuizData(data);
    setQuizStep(0);
    setQuizResult([]);
    setWrittenValue('');
    setMode('quiz');
  };

  const restartQuiz = () => {
    startQuiz();
  };

  const reviewWrong = () => {
    if (!quizData.length) return;
    const wrongData = quizData.filter((_, idx) => quizResult[idx] === false);
    if (wrongData.length === 0) return startQuiz();
    const data = quizType === 'mcq' ? generateQuizData(wrongData) : wrongData;
    setQuizData(data);
    setQuizStep(0);
    setQuizResult([]);
    setWrittenValue('');
    setMode('quiz');
  };

  const progress = quizData.length ? (quizStep / quizData.length) : 0;

  // Main UI
  return (
    <div className={`flashcards-app center-content`}>
      <header>
        <h1>📚 Flashcards App</h1>
        <nav>
          <button className={mode === 'list' ? 'active' : ''} onClick={() => setMode('list')}>Danh sách thẻ</button>
          <button className={mode === 'study' ? 'active' : ''} onClick={startStudy}>Chế độ học</button>
          <button className={mode === 'quiz' ? 'active' : ''} onClick={startQuiz}>Làm bài ({quizType === 'mcq' ? 'Trắc nghiệm' : 'Tự luận'})</button>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} title="Đổi giao diện">
          {theme === 'light' ? '🌞 Sáng' : '🌙 Tối'}
        </button>
      </header>

      <main>
        {mode === 'list' && (
          <CardList cards={cards} addCard={addCard} deleteCard={deleteCard} editCard={editCard} quizType={quizType} setQuizType={setQuizType} startQuiz={startQuiz} />
        )}
        {mode === 'study' && (
          <StudyMode card={orderedCards[current]} showBack={showBack} setShowBack={setShowBack} nextCard={nextCard} />
        )}
        {mode === 'quiz' && (
          quizType === 'mcq' ? (
            <QuizMode data={quizData} step={quizStep} onAnswer={answerMCQ} result={quizResult} onRestart={restartQuiz} onReviewWrong={reviewWrong} progress={progress} />
          ) : (
            <WrittenMode data={quizData} step={quizStep} value={writtenValue} setValue={setWrittenValue} onSubmit={submitWritten} result={quizResult} onRestart={restartQuiz} onReviewWrong={reviewWrong} progress={progress} />
          )
        )}
      </main>
      <footer>
        <span>© 2025 Flashcards App | Made with MeHeHe❤️</span>
      </footer>
    </div>
  );
}

export default App;
