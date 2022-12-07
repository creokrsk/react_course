import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ addededToFavorites, onAddToFav, userId }) => {
    if (addededToFavorites === true) {
        // console.log('222');
        return (
            <>
                <button onClick={() => onAddToFav(userId)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-tag-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                </button>
            </>
        );
    } else {
        // console.log('333');
        return (
            <>
                <button onClick={() => onAddToFav(userId)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-tag"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
                        <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
                    </svg>
                </button>
            </>
        );
    }
};

Bookmark.propTypes = {
    addededToFavorites: PropTypes.bool,
    onAddToFav: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
};

export default Bookmark;
