import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RoasterNotesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const coffeeData = location.state || {};
  
  // Debug: Log the coffeeData to verify it's being passed correctly
  console.log('Coffee Data:', coffeeData);
  if (!location.state || Object.keys(coffeeData).length === 0) {
    console.warn('Warning: No coffee data received from previous page. Check navigation state.');
  }
  
  const [notes, setNotes] = useState(['', '', '']);
  
  const addField = () => {
    if (notes.length < 10) {
      setNotes([...notes, '']);
    }
  };
  
  const removeField = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };
  
  const updateNote = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };
  
  return (
    <div className='page'>
      <div className='header'>
        <button onClick={() => navigate(-1)}>←</button>
        <h1>로스터 노트</h1>
      </div>
      
      <div className='coffee-summary' style={{
        padding: '16px',
        margin: '16px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '16px',
        color: '#333'
      }}>
        {coffeeData.name || '커피 이름'} - {coffeeData.roastery || '로스터리'}
      </div>
      
      <div className='form-section' style={{
        padding: '0 16px 80px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '18px',
          marginBottom: '8px',
          color: '#333'
        }}>로스터는 어떤 맛이라고 했나요?</h2>
        <p className='subtitle' style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '16px'
        }}>최대 10개까지 입력하세요</p>
        
        <div className='notes-container'>
          {notes.map((note, index) => (
            <div key={index} className='note-field'>
              <input 
                type='text'
                placeholder={`${index + 1}번째 맛 (${index === 0 ? '필수' : '선택'})`}
                value={note}
                onChange={(e) => updateNote(index, e.target.value)}
                className='note-input'
              />
              {index > 0 && (
                <button 
                  className='remove-btn'
                  onClick={() => removeField(index)}
                  type='button'
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        
        {notes.length < 10 && (
          <button 
            className='add-button'
            onClick={addField}
            type='button'
          >
            + 맛 추가하기
          </button>
        )}
      </div>
      
      <button 
        className='next-button'
        disabled={!notes[0].trim()}
        onClick={() => {
          const roasterNotes = notes.filter(note => note.trim());
          navigate('/taste-select', { 
            state: { ...coffeeData, roasterNotes } 
          });
        }}
      >
        다음
      </button>
    </div>
  );
}

export default RoasterNotesPage;
