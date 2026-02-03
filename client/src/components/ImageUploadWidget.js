import React, { useState } from 'react';
import './ImageUploadWidget.css';

function ImageUploadWidget({ onUploadComplete, currentImageUrl }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState(currentImageUrl || '');
  const [uploadMethod, setUploadMethod] = useState('url');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setImageUrl(data.url);
      onUploadComplete(data.url);
    } catch (err) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlInput = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url) {
      onUploadComplete(url);
    }
  };

  return (
    <div className="upload-widget">
      <div className="upload-tabs">
        <button
          className={`upload-tab ${uploadMethod === 'url' ? 'active' : ''}`}
          onClick={() => setUploadMethod('url')}
        >
          URL
        </button>
        <button
          className={`upload-tab ${uploadMethod === 'file' ? 'active' : ''}`}
          onClick={() => setUploadMethod('file')}
        >
          Upload File
        </button>
      </div>

      {uploadMethod === 'url' ? (
        <div className="upload-content">
          <input
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleUrlInput}
            className="url-input"
          />
        </div>
      ) : (
        <div className="upload-content">
          <label htmlFor="file-input" className="file-upload-label">
            {uploading ? 'Uploading...' : 'Click to select file or drag & drop'}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="file-input"
          />
        </div>
      )}

      {error && <div className="upload-error">{error}</div>}

      {imageUrl && (
        <div className="preview-section">
          <p className="preview-label">Preview:</p>
          <img src={imageUrl} alt="Preview" className="preview-image" />
        </div>
      )}
    </div>
  );
}

export default ImageUploadWidget;
