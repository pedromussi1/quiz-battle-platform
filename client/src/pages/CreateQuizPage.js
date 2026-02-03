import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI, categoryAPI } from '../services/api';
import ImageUploadWidget from '../components/ImageUploadWidget';
import './CreateQuizPage.css';

function CreateQuizPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'multiple-choice',
    category: '',
    questions: [
      {
        question: '',
        imageUrl: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
      },
    ],
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
      if (response.data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          category: response.data[0]._id,
        }));
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleBasicInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    if (field === 'question' || field === 'imageUrl') {
      newQuestions[index][field] = value;
    } else if (field === 'correctAnswerIndex') {
      newQuestions[index][field] = parseInt(value);
    }
    setFormData((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setFormData((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          imageUrl: '',
          options: ['', '', '', ''],
          correctAnswerIndex: 0,
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.title || !formData.category) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const response = await quizAPI.createQuiz(formData);
      navigate(`/quiz/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-quiz-page">
      <h1>Create New Quiz</h1>

      <form onSubmit={handleSubmit} className="create-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="title">Quiz Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleBasicInputChange}
              placeholder="Enter quiz title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleBasicInputChange}
              placeholder="Enter quiz description (optional)"
              rows="4"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type">Quiz Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleBasicInputChange}
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="bracket-battle">Bracket Battle</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleBasicInputChange}
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {formData.type === 'multiple-choice' && (
          <div className="form-section">
            <h2>Questions</h2>

            {formData.questions.map((question, qIdx) => (
              <div key={qIdx} className="question-form">
                <div className="question-header">
                  <h3>Question {qIdx + 1}</h3>
                  {formData.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIdx)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor={`question-${qIdx}`}>Question Text</label>
                  <input
                    type="text"
                    id={`question-${qIdx}`}
                    value={question.question}
                    onChange={(e) => handleQuestionChange(qIdx, 'question', e.target.value)}
                    placeholder="Enter question"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`image-${qIdx}`}>Image URL (optional)</label>
                  <ImageUploadWidget
                    currentImageUrl={question.imageUrl}
                    onUploadComplete={(url) => handleQuestionChange(qIdx, 'imageUrl', url)}
                  />
                </div>

                <div className="options-section">
                  <label>Answer Options</label>
                  {question.options.map((option, oIdx) => (
                    <div key={oIdx} className="option-input">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                      />
                      <input
                        type="radio"
                        name={`correct-${qIdx}`}
                        checked={question.correctAnswerIndex === oIdx}
                        onChange={() => handleQuestionChange(qIdx, 'correctAnswerIndex', oIdx)}
                        title="Mark as correct answer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button type="button" onClick={addQuestion} className="add-question-btn">
              + Add Question
            </button>
          </div>
        )}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
}

export default CreateQuizPage;
