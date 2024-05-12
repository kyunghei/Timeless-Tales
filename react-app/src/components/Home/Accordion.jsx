import React from 'react';
import AccordionItem from './AccordionItem';

// This is the main container for all accordion items.
function Accordion() {
    return (
        <div>
            <AccordionItem header="+ Customize Your Adventure" body="Blah" />
            <AccordionItem header="+ Dive into the Story" body="Blah" />
            <AccordionItem header="+ Make Your Choices" body="Blah" />
            <AccordionItem header="+ Play Through a New Story" body="Blah" />
        </div>
    );
}

export default Accordion;