import { useState, useEffect } from 'react';
import React from "react";
import {useNavigate, useParams} from 'react-router-dom'
import TextField from "@mui/material/TextField"
import { useFetchBooksQuery } from './API/bookBuddyApi';



//Neeed usePostsQuery that gets data 

const Books = () => {

    const {books} = useParams()
    const {data, error, isLoading } = useFetchBooksQuery(books); 
    console.log(data);
    const navigate = useNavigate();
    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <ul>
            {data.books.map((book) => (
                <li key={book.id}>{book.title}
                    <button onClick={() => navigate(`/books/${book.id}`)}>More Info</button>
                    <img src={book.coverimage} />
                </li>
            ))}
        </ul>
    )
}; 
export default Books

   /* const [allBooks, setAllBooks] = useState([])
    const [error, setError] = useState(null)
    const [searchParam, setSearchParam] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/');
                const result = await response.json();
                //console.log(result);
                setAllBooks(result.books)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks();
    }, []);
    const filteredBooks = searchParam
             ? allBooks.filter((book)=>
             book.title.toLowerCase().includes(searchParam)
             )
             : allBooks;
    return(
        <div>
            <div>
                <label>

                    <TextField 
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
                    />
    
                </label>
            </div>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {filteredBooks.map((book) => (
                        <li key={book.id}>{book.title}
                            <button onClick={() => navigate(`/books/${book.id}`)}>More Info</button>
                        <img src={book.coverimage} />
                        </li>
                        ))}
                </ul>
            )
            }
        </div>
    ); */

