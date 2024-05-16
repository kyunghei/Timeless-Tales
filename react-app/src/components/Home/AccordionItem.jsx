import { useState } from 'react';
import PropTypes from 'prop-types';
import HTMLReactParser from 'html-react-parser/lib/index';

// Each item in the accordion that can be expanded or collapsed.
function AccordionItem({ header, body }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <button className='accordian-button' onClick={toggle} style={{ wwidth: '100%', textAlign: 'left' }}>
                {header}
            </button>

            {/* Check if accordion is open. If so, render a div that contains the body props. */}
            {isOpen && (
                <div style={{ padding: '10px' }}>
                    {HTMLReactParser(body)}
                </div>
            )}
        </div>
    );
}

export default AccordionItem;

AccordionItem.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
};
