import PropTypes from 'prop-types';
import fantasyImg from '../../assets/fantasycover500.png';
import scifiImg from '../../assets/scificover500.png';
import westernImg from '../../assets/westerncover500.png';

/**
 * Represents the genre selection step in the mutli-step customization form.
 * Allows the user to choose a genre.
 * @param {string} selectedGenre The genre currently selected by the user, used to highlight the selected option.
 * @param {Function} onGenreSelect Passed from parent component to handle genre selection.
 */

function GenreStep({ selectedGenre, onGenreSelect }) {

    return (
        <form onSubmit={(e) => e.preventDefault()} >
            <h2>What Kind of Story Will You Tell?</h2>
            <div className='genre-selection'>
                <div className='fantasy'>
                    <GenreOption genre='Fantasy' isSelected={selectedGenre === 'Fantasy'} onSelectGenre={onGenreSelect} imageSrc={fantasyImg} />
                </div>
                <div className='western'>
                    <GenreOption genre='Western' isSelected={selectedGenre === 'Western'} onSelectGenre={onGenreSelect} imageSrc={westernImg} />
                </div>
                <div className='scifi'>
                    <GenreOption genre='SciFi' isSelected={selectedGenre === 'SciFi'} onSelectGenre={onGenreSelect} imageSrc={scifiImg} />
                </div>                
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
function GenreOption({ genre, isSelected, onSelectGenre, imageSrc }) {
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
                <img src={imageSrc} alt="genre option" width='200px' height='200px' margin='25px' />
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