import React, { useState, useEffect } from "react";

export default function Pokemon({ name }) {
	const [data, setData] = useState({
        name: "",
        sprites: {
            front_default: "",
            back_default: ""
        }
    })

    const [sprite, setSprite] = useState(data.sprites.front_default);
    
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
       .then(response => response.json())
       .then(data => {
            setData(data)
            setSprite(data.sprites.front_default);
        });
    }, [name]);

    const cry = () => {
        const audio = new Audio(data.cries.latest);
        audio.play();
    };
    
    return (
		<div className="card">
			<div className="card-body">
				<h5>{name}</h5>
                <img src={sprite} className="w-100" alt={name} 
                onMouseEnter={() => setSprite(data.sprites.back_default) }
                onMouseLeave={() => setSprite(data.sprites.front_default)}
                onClick={ () => cry() } />
			</div>
		</div>
	);
}
