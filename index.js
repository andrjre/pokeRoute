
let totalPokemon = [];

function getEncounters() {

    totalPokemon = [];
    const game = document.getElementById('game').value;
    const route = document.getElementById('routes').value;     

        fetch(`https://pokeapi.co/api/v2/location-area/${route}`)
        .then(response => response.json())
        .then(data => {
           data.pokemon_encounters
            .filter(encounter =>
                encounter.version_details.some(v => v.version.name === game)
            )

            .forEach(encounter => {

                const versionData = encounter.version_details.find(v => v.version.name === game);
                let count = versionData.encounter_details;
                let size = count.length
                let name = encounter.pokemon.name
                
                if(size >= 1){
                    let methodTotals = {};
                    for(let i = 0; i < size; i++){
                        let methodName = count[i].method.name;
                        let chance = count[i].chance;
                        methodTotals[methodName] = (methodTotals[methodName] || 0) + chance;
                    }
                    totalPokemon.push(name);
                    console.log(name, methodTotals);
                }
                console.log("next pokemon");
            }); 
            console.log(totalPokemon);
        });
    }

document.getElementById('game').addEventListener('change', getEncounters);
document.getElementById('routes').addEventListener('change', getEncounters);

getEncounters();

// routes 2 19 20 21 dont work due to different naming conventions 
