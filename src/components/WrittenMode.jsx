import React from 'react';

export default function WrittenMode({ data, step, value, setValue, onSubmit, result, onRestart, onReviewWrong, progress }) {
  const total = data.length;

  if (total === 0) {
    return (
      <section className="quiz-mode">
        <h2>Tự luận</h2>
        <p>Chưa có thẻ để làm bài.</p>
      </section>
    );
  }

  if (step >= total) {
    const correctCount = result.filter(Boolean).length;
    return (
      <section className="quiz-mode">
        <h2>Kết quả tự luận</h2>
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
      <h2>Tự luận</h2>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${Math.min(100, Math.round(progress * 100))}%` }} />
      </div>
      <div className="quiz-card">
        <span className="front">{question.front}</span>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} style={{ width: '100%' }}>
          <input required placeholder="Nhập đáp án..." value={value} onChange={(e) => setValue(e.target.value)} />
          <button type="submit">Kiểm tra</button>
        </form>
      </div>
      <p>Câu {step + 1}/{total}</p>
    </section>
  );
}
