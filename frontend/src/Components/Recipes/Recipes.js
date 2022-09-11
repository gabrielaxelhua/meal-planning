import React, { useEffect, useState } from "react"
import RecipeForm from "../RecipeForm/RecipeForm"
import RecipesListView from "../RecipesListView/RecipesListView"
import { Link } from "react-router-dom"
import RecipesCardView from "../RecipesCardView/RecipesCardView"
import { useFetch } from "../../hooks/useFetch"


export default function Recipes() {

    // const [url, setUrl] = useState('http://localhost:3000/recipes')
    // useEffect(() => {
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(json => setRecipeCollection(json))
    // }, [url])

    // start--------------------
    const [recipeCollection, setRecipeCollection] = useState([])
    const [listView, setListView] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3000/recipes')
            .then(response => response.json())
            .then(json => setRecipeCollection(json))
    }, [])

    console.log(recipeCollection)

    const addRecipe = (recipe) => {
        setRecipeCollection((prevCollection) => {
            return [...prevCollection, recipe]

        })
    }

    const handleClick = (id) => {
        setRecipeCollection(prevEvents => {
            return prevEvents.filter(event => id !== event.id)
        })
    }
    //end----------------------


    return (

        <>
            <h1>My Recipes</h1>
            {listView ? <RecipesListView recipes={recipeCollection} handleClick={handleClick} /> :
                <RecipesCardView recipes={recipeCollection} handleClick={handleClick} />}
            {/* {table} */}
            <Link to="/create">
                <button>Pop Up For New Recipe</button>
            </Link>
            {/* <RecipeForm addRecipe={addRecipe} /> */}
            <button>Create Meal Plan</button>

        </>

    )
}


// const { data: recipes, isPending, error } = useFetch('http://localhost:3000/recipes')
// const [listView, setListView] = useState(true)

// return (
//     <div className="recipes">
//         {error && <p className="error">{error}</p>}
//         {isPending && <p className="loading">Loading...</p>}
//         {recipes && (
//             <>
//                 <h1>My Recipes</h1>
//                 {listView ? <RecipesListView recipes={recipes} /> :
//                     <RecipesCardView recipes={recipes} />}
//                 {/* {table} */}
//                 <Link to="/create">
//                     <button>Pop Up For New Recipe</button>
//                 </Link>
//                 <RecipeForm />
//                 <button>Create Meal Plan</button>

//             </>
//         )}
//     </div>
// )
//         }