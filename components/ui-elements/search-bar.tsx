import React, { useState } from 'react';
import { Form } from 'react-bootstrap';


function SearchBar(): JSX.Element {
    

    return<>
        <Form.Control  placeholder='Найдите товар' id='search_bar' className="input rounded-4 height-3"/>
    </>
}

export default SearchBar; 
