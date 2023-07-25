<ul>
          {data?.map(({ title, id }, index) => (
            <li key={`${index}_${id}`} className="text-red-500">
              {title}
            </li>
          ))}
        </ul>
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => {
            return (
              <>
                <div key={index}>loading...</div>
              </>
            )
          })}

=============================

prev dan nex page mthode

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3/trending/movie';
const language = 'en-US';
const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGQ3ZDQ4YTdjMDg0MDllZmQ4ZGEyM2M1NTU1MzQzZCIsInN1YiI6IjY0MDIwOGM5Mjc4ZDhhMDA3YTEzM2Y4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qk811ISCeLniJMOgvnqTZc5piK4yFXTsThU3kRAS4o8';

const MovieList = () => {
const [movies, setMovies] = useState([]);
const [page, setPage] = useState(1);

useEffect(() => {
fetchData();
}, [page]);

const fetchData = async () => {
try {
const response = await axios.get(`${apiUrl}/week`, {
params: { language, page },
headers: {
accept: 'application/json',
Authorization: token
}
});
setMovies(response.data.results);
} catch (error) {
console.error(error);
}
};

const goToPreviousPage = () => {
if (page > 1) {
setPage(page - 1);
}
};

const goToNextPage = () => {
setPage(page + 1);
};

return (

<div>
<h1>Trending Movies</h1>
<ul>
{movies.map((movie) => (
<li key={movie.id}>{movie.title}</li>
))}
</ul>
<div>
<button onClick={goToPreviousPage} disabled={page === 1}>
Previous Page
</button>
<button onClick={goToNextPage}>Next Page</button>
</div>
</div>
);
};

export default MovieList;

====================================================================

load more methode

import React, { useState, useEffect } from "react"
import axios from "axios"

const apiUrl = "https://api.themoviedb.org/3/trending/movie"
const language = "en-US"
const token =
"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGQ3ZDQ4YTdjMDg0MDllZmQ4ZGEyM2M1NTU1MzQzZCIsInN1YiI6IjY0MDIwOGM5Mjc4ZDhhMDA3YTEzM2Y4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qk811ISCeLniJMOgvnqTZc5piK4yFXTsThU3kRAS4o8"

const PopularMovie = () => {
const [movies, setMovies] = useState([])
const [page, setPage] = useState(1)

useEffect(() => {
fetchData()
}, [page])

const fetchData = async () => {
try {
const response = await axios.get(`${apiUrl}/week`, {
params: { language, page },
headers: {
accept: "application/json",
Authorization: token,
},
})
setMovies((prevMovies) => [...prevMovies, ...response.data.results])
} catch (error) {
console.error(error)
}
}

const loadMore = () => {
setPage((prevPage) => prevPage + 1)
}

return (

<div>
<h1>Trending Movies</h1>
<ul>
{movies.map((movie) => (
<li key={movie.id}>{movie.title}</li>
))}
</ul>
<div>
<button onClick={loadMore}>Load More</button>
</div>
</div>
)
}

export default PopularMovie

===============================================================================

\\ 1

import React from 'react';

const CardFilm = ({ film }) => {
return (

<div className="p-4">
<div className="bg-white rounded-lg shadow-lg">
<img src={film.image} alt={film.title} className="w-full h-auto rounded-t-lg" />
<div className="p-4">
<h3 className="text-xl font-semibold">{film.title}</h3>
<p className="text-gray-500">{film.description}</p>
</div>
</div>
</div>
);
};

export default CardFilm;

\\ 2

import React from 'react';
import CardFilm from './CardFilm';

const FilmList = ({ films }) => {
return (

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{films.map((film) => (
<CardFilm key={film.id} film={film} />
))}
</div>
);
};

export default FilmList;

\\ 3
import React from 'react';
import FilmList from './FilmList';

const HomePage = () => {
const films = [
{
id: 1,
title: 'Film 1',
image: 'path-to-image-1',
description: 'Deskripsi film 1',
},
{
id: 2,
title: 'Film 2',
image: 'path-to-image-2',
description: 'Deskripsi film 2',
},
// Tambahkan data film lainnya
];

return (

<div>
<h1 className="text-2xl font-semibold mb-4">Daftar Film</h1>
<

==============================================================================

mengatur card bisa menggunakan grid grid-col

<!-- navbar responsive -->

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  font-family: 'Lato', sans-serif;
}

.overlay {
height: 0%;
width: 100%;
position: fixed;
z-index: 1;
top: 0;
left: 0;
background-color: rgb(0,0,0);
background-color: rgba(0,0,0, 0.9);
overflow-y: hidden;
transition: 0.5s;
}

.overlay-content {
position: relative;
top: 25%;
width: 100%;
text-align: center;
margin-top: 30px;
}

.overlay a {
padding: 8px;
text-decoration: none;
font-size: 36px;
color: #818181;
display: block;
transition: 0.3s;
}

.overlay a:hover, .overlay a:focus {
color: #f1f1f1;
}

.overlay .closebtn {
position: absolute;
top: 20px;
right: 45px;
font-size: 60px;
}

@media screen and (max-height: 450px) {
.overlay {overflow-y: auto;}
.overlay a {font-size: 20px}
.overlay .closebtn {
font-size: 40px;
top: 15px;
right: 35px;
}
}
</style>

</head>
<body>

<div id="myNav" class="overlay">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <div class="overlay-content">
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Clients</a>
    <a href="#">Contact</a>
  </div>
</div>

<h2>Fullscreen Overlay Nav Example</h2>
<p>Click on the element below to open the fullscreen overlay navigation menu.</p>
<p>In this example, the navigation menu will slide downwards from the top:</p>
<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>

<script>
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
</script>

</body>
</html>
