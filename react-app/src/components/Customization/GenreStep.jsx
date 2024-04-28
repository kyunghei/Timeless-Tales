import PropTypes from 'prop-types';
import logo from '../../assets/logo.webp';

/**
 * Represents the genre selection step in the mutli-step customization form.
 * Allows the user to choose a genre.
 * @param {string} selectedGenre The genre currently selected by the user, used to highlight the selected option.
 * @param {Function} onGenreSelect Passed from parent component to handle genre selection.
 */

function GenreStep({ selectedGenre, onGenreSelect }) {

    return (
        <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center', padding: '20px' }}>
            <h2>What Kind of Story Will You Tell?</h2>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px' }}>
                <GenreOption genre='Fantasy' isSelected={selectedGenre === 'Fantasy'} onSelectGenre={onGenreSelect} />
                <GenreOption genre='Western' isSelected={selectedGenre === 'Western'} onSelectGenre={onGenreSelect} />
                <GenreOption genre='Sci-Fi' isSelected={selectedGenre === 'Sci-Fi'} onSelectGenre={onGenreSelect} />
            </div>

        </form>
    );
}

/**
 * Displays a genre option that can be selected.
 * Each option includes the genre image and a label that highlights upon selection.
 * 
 * @param {string} genre The name of the genre.
 * @param {boolean} isSelected Shows if this genre is currently selected or not.
 * @param {function} onSelectGenre Function that sets the selected genre
 */
function GenreOption({ genre, isSelected, onSelectGenre }) {
    const style = {
        padding: '10px',
        margin: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: isSelected ? '2px solid black' : 'none',
        borderRadius: '5px',
        fontSize: '25px'
    }
    return (
        <>
            <div style={style} onClick={() => onSelectGenre(genre)}>
                <img src={logo} alt="genre option" width='300px' height='300px' />
                {genre}
            </div>

        </>

    );
}

export default GenreStep;

// Add PropTypes validation from GenreOption
GenreOption.propTypes = {
    genre: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectGenre: PropTypes.func.isRequired
}

GenreStep.propTypes = {
    selectedGenre: PropTypes.string.isRequired,
    onGenreSelect: PropTypes.func.isRequired
}