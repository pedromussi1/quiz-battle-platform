import React, { useState, useEffect } from 'react';
import { quizAPI, categoryAPI } from '../services/api';
import QuizCard from '../components/QuizCard';
import './HomePage.css';

function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, [selectedCategory, searchQuery, sortBy, page]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const filters = {
        category: selectedCategory,
        search: searchQuery,
        sortBy,
        order: 'desc',
        limit: 12,
        skip: page * 12,
      };

      const response = await quizAPI.getAllQuizzes(filters);
      setQuizzes(page === 0 ? response.data.quizzes : [...quizzes, ...response.data.quizzes]);
      setHasMore(response.data.quizzes.length === 12);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    setQuizzes([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="home-page">
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(0);
              setQuizzes([]);
            }}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(0);
              setQuizzes([]);
            }}
            className="filter-select"
          >
            <option value="createdAt">Latest</option>
            <option value="playCount">Most Played</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="quizzes-grid">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} />
        ))}
      </div>

      {loading && <div className="loading">Loading quizzes...</div>}

      {!loading && quizzes.length === 0 && (
        <div className="no-results">
          <p>No quizzes found. Try adjusting your filters.</p>
        </div>
      )}

      {!loading && hasMore && (
        <div className="load-more">
          <button onClick={handleLoadMore} className="load-more-btn">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
