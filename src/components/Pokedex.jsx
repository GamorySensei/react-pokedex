import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(6);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=" + limit)
        .then((response) => response.json())
        .then((data) => {
            setPokemons([...pokemons, ...data.results]);
            setFilteredPokemons([...pokemons, ...data.results]);
            setLoading(false);
        })
    }, [offset]);

    const search = (query) => {
        if (query.trim() === "") {
            setFilteredPokemons(pokemons);
            return;
        }
        setFilteredPokemons(
            pokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    return (
        <div className="container">
            <h1>Pokedex</h1>

            <div class="row">
                <div className="col">
                    <input type="text" onKeyUp={ (e) => search(e.target.value) } className="form-control mb-4" placeholder="Search..." />
                </div>
                <div className="col">
                    <select className="form-control mb-4" onChange={ (e) => setLimit(e.target.value) } value={limit}>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                        <option value="24">24</option>
                    </select>
                </div>
            </div>

            {loading && <p>Loading...</p>}

            <div className="row">
                {filteredPokemons.map((pokemon) => (
                    <div className="col-md-2 mb-4" key={pokemon.name}>
                        <Pokemon name={pokemon.name} />
                    </div>
                ))}
            </div>

            <div className="row">
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={ () => setOffset(offset + parseInt(limit)) }>Load more</button>
                </div>
            </div>
        </div>
    );
}
