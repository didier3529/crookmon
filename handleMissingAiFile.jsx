import React from 'react';
import PropTypes from 'prop-types';

const HandleMissingAiFile = ({ aiFileName, onRetry, onBack }) => {
  const hasActions = onRetry || onBack;

  return (
    <div className="missing-ai-file">
      <h2>AI File Missing</h2>
      <p>
        We couldn?t load the AI file "<strong>{aiFileName}</strong>".
      </p>
      {hasActions && (
        <div className="missing-ai-file__actions">
          {onRetry && (
            <button
              type="button"
              className="missing-ai-file__button"
              onClick={onRetry}
            >
              Retry
            </button>
          )}
          {onBack && (
            <button
              type="button"
              className="missing-ai-file__button"
              onClick={onBack}
            >
              Back to Selection
            </button>
          )}
        </div>
      )}
    </div>
  );
};

HandleMissingAiFile.propTypes = {
  aiFileName: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  onBack: PropTypes.func,
};

HandleMissingAiFile.defaultProps = {
  onRetry: null,
  onBack: null,
};

export default HandleMissingAiFile;