import React, { useEffect, useState } from 'react';
import Header from './header';
import './homepage.css';

const HomePage = () => {
    const [text, setText] = useState('');
    const fullText = 'Weelcome to #theBlog';

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setText((prevText) => prevText + fullText.charAt(index));
            index++;
            if (index === fullText.length) {
                clearInterval(intervalId);
            }
        }, 150); // Adjust the speed as needed

        return () => clearInterval(intervalId); // Clean up the interval on unmount
    }, [fullText]);

    return (
        <div className="home-container">
            <Header />
            <h1>{text}</h1>
        </div>
    );
};

export default HomePage;
