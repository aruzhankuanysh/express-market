import React, { useState } from 'react';
import { Form } from 'react-bootstrap';


function SearchBar(): JSX.Element {
    
    return<>
           <Form.Control  placeholder='Найдите товар' id='search_bar' className="input flex-grow-1" size='sm'/>


    </>
}

export default SearchBar; 