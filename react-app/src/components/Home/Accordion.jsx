import AccordionItem from './AccordionItem';
// import ReactHtmlParser from 'html-react-parser';

// This is the main container for all accordion items.
function Accordion() {
    return (
        <div className='accordian'>
            <AccordionItem header="+ Customize Your Adventure"
            body= {`<ul>
                <li><b>Choose your Genre</b>: Select from three exciting story genres - Fantasy, Western, or Sci-Fi.</li>
                <li><b>Select Story Length</b>: Decide how long you want your adventure to be - Short, Medium, or Long.</li>
                <li><b>Create your Character</b>: Pick an avatar and give your character a name to represent you in the story.</li>
             </ul>`}
            />
            
            <AccordionItem header="+ Dive into the Story" 
            body={`Now that you've customized your adventure, it's time to dive into the story! Sit back, relax, and let the AI
            weave a captivating tale filled with twists and turns.`} />
            
            <AccordionItem header="+ Make Your Choices" 
            body={`As the story unfolds, you'll be presented with various choices that will shape the outcome of your adventure. 
            Choose wisely, as some decisions may lead to unexpected consequences! Remember, each character has only three lives, 
            so be cautious with your choices.
            <ul>
                <li><b>Select a Choice</b>: Read through the options presented and choose the one you think is best for your character.</li>
                <li><b>Face the Consequences</b>: Some choices may lead to a 'bad end' and result in the loss of one of your character's lives.</li>
            </ul>`} />
            
            <AccordionItem header="+ Play Through a New Story" 
            body={`Once your adventure has concluded, you can start anew with different customization options or replay the same story 
            to explore alternative paths.\n\n

            <ul>
                <li>Revisit Customization: Choose to replay with the same genre, story length, and character, or mix things up with new options.</li>
                <li>Explore New Paths: Experiment with different choices to uncover alternative storylines and outcomes.</li>
            </ul>`} />
        </div>
    );
}

export default Accordion;