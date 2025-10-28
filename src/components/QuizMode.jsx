import React from 'react';

export default function QuizMode({ data, step, onAnswer, result, onRestart, onReviewWrong, progress }) {
  const total = data.length;

  if (total === 0) {
    return (
      <section className="quiz-mode">
        <h2>Trắc nghiệm</h2>
        <p>Chưa có thẻ để làm bài.</p>
      </section>
    );
  }

  if (step >= total) {
    const correctCount = result.filter(Boolean).length;
    return (
      <section className="quiz-mode">
        <h2>Kết quả trắc nghiệm</h2>
        <p>Bạn đúng {correctCount}/{total} câu!</p>
        <div className="quiz-actions">
          <button onClick={onRestart}>Làm lại</button>
          <button onClick={onReviewWrong}>Ôn câu sai</button>
        </div>
        <ul>
          {data.map((q, i) => (
            <li key={q.id} className={result[i] ? 'correct' : 'wrong'}>
              {q.front} → {q.correct} {result[i] ? '✔️' : '❌'}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const question = data[step];

  return (
    <section className="quiz-mode">
      <h2>Trắc nghiệm</h2>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${Math.min(100, Math.round(progress * 100))}%` }} />
      </div>
      <div className="quiz-card">
        <span className="front">{question.front}</span>
        <div className="options">
          {question.options.map((opt, idx) => (
            <button key={idx} className="option" onClick={() => onAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
      <p>Câu {step + 1}/{total}</p>
    </section>
  );
}
