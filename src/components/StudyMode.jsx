import React from 'react';

export default function StudyMode({ card, showBack, setShowBack, nextCard }) {
  if (!card) return <div>Không có thẻ nào.</div>;
  return (
    <section className="study-mode">
      <h2>Chế độ học</h2>
      <div className="flashcard" onClick={() => setShowBack(!showBack)}>
        <div className={showBack ? 'back' : 'front'}>
          {showBack ? card.back : card.front}
        </div>
      </div>
      <button onClick={nextCard}>Thẻ tiếp theo</button>
      <p>Nhấn vào thẻ để lật mặt!</p>
    </section>
  );
}
