import React, { useState } from 'react';

export default function CardList({ cards, addCard, deleteCard, editCard, quizType, setQuizType, startQuiz }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [editId, setEditId] = useState(null);
  const [editFront, setEditFront] = useState('');
  const [editBack, setEditBack] = useState('');

  return (
    <section className="card-list">
      <h2>Danh sách thẻ</h2>
      <form className="add-form" onSubmit={e => { e.preventDefault(); addCard(front, back); setFront(''); setBack(''); }}>
        <input required placeholder="Mặt trước" value={front} onChange={e => setFront(e.target.value)} />
        <input required placeholder="Mặt sau" value={back} onChange={e => setBack(e.target.value)} />
        <button type="submit">Thêm thẻ</button>
      </form>

      <div className="quiz-type-picker" style={{ width: '100%', marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
        <label style={{ fontWeight: 700, color: 'var(--primary)' }}>Hình thức:</label>
        <select value={quizType} onChange={e => setQuizType(e.target.value)} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }}>
          <option value="mcq">Trắc nghiệm</option>
          <option value="written">Tự luận</option>
        </select>
        <button type="button" onClick={startQuiz} style={{ marginLeft: 'auto' }}>Bắt đầu làm bài</button>
      </div>

      <ul>
        {cards.map(card => (
          <li key={card.id} className="card-item">
            {editId === card.id ? (
              <form className="edit-form" onSubmit={e => { e.preventDefault(); editCard(card.id, editFront, editBack); setEditId(null); }}>
                <input value={editFront} onChange={e => setEditFront(e.target.value)} />
                <input value={editBack} onChange={e => setEditBack(e.target.value)} />
                <button type="submit">Lưu</button>
                <button type="button" onClick={() => setEditId(null)}>Hủy</button>
              </form>
            ) : (
              <>
                <span className="front">{card.front}</span>
                <span className="back">{card.back}</span>
                <button onClick={() => { setEditId(card.id); setEditFront(card.front); setEditBack(card.back); }}>Sửa</button>
                <button onClick={() => deleteCard(card.id)}>Xóa</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
