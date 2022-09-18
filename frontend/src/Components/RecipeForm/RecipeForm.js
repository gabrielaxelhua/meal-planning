import { useRef } from "react"
import { useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import { Link } from "react-router-dom"
import './RecipeForm.css'


//TODO current implementation creates dot before first ingredient, not sure why

export default function RecipeForm() {

    //optional - send default values
    const [tags, setTags] = useState([])

    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState('')
    const [ingredients, setIngredients] = useState([{
            ingredientId: 1, ingredientName: '', superCategory : null,  ingredientTypes: 'Other', amount: null, measurement : 'empty', recipeNote: '',
        }])
    const [newIngredient, setNewIngredient] = useState(
        ''
    )
    const [prepTime, setPrepTime] = useState({
        prepHrs: '',
        prepMins: ''
    })
    const [cookTime, setCookTime] = useState({
        cookHrs: '',
        cookMins: ''
    })
    const [isPrivate, setPrivate] = useState(true)
    const [pictureLinks, setPictureLinks] = useState(['null'])
    const [referenceLink, setReferenceLink] = useState('null')
    const [subHeader, setSubHeader] = useState('null')

    const { postData, data, error } = useFetch("http://localhost:8081/FormCreate", "POST")

    const resetForm = () => {
        setTitle('')
        setInstructions('')
        setNewIngredient('')
        setIngredients([])
        setPrepTime({
            prepHrs: '',
            prepMins: ''
        })
        setCookTime({
            cookHrs: '',
            cookMins: ''
        })
    }

    //NOTE: saving to json server will auto generate unique id
    const handleSubmit = (e) => {
        e.preventDefault()
        //translates cooktime and preptime to match single int representing minutes in database
        const translatedCookTime = (cookTime.cookHrs * 60) + cookTime.cookMins;
        const translatedPrepTime = (prepTime.prepHrs * 60) + prepTime.prepMins;
        //sets up ingredient as ingredient object to match API model
        for (let i = 0; i < ingredients.length; i++)
        {
            ingredients[i] = {ingredientId: 1, ingredientName: 'ingredient', superCategory : 0,  ingredientTypes: 'Other', amount: 0, measurement : 'empty', recipeNote: ingredients[i].recipeNote}
        }
        postData({recipeId: 1, creatorId: 1, title, date : '01-01-1999', translatedPrepTime, ingredients, instructions, isPrivate, pictureLinks, referenceLink, subHeader})
        resetForm()
    }

    const ingredientList = ingredients.map((ingredient) => {
        return (
            <ul>
                <li key={ingredient.id}>{ingredient.recipeNote}</li>
            </ul>
        )
    })

    const handlePrepChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        console.log({ name }, { value })
        setPrepTime((prevPrepTime) => {
            return { ...prevPrepTime, [name]: value }
        })
    }

    const handleCookChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        console.log({ name }, { value })
        setCookTime((prevCookTime) => {
            return { ...prevCookTime, [name]: value }
        })
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const newIng = {
            id: Math.floor(Math.random() * 10000),
            ingredientName: null, 
            superCategory : null,  
            ingredientTypes: null, 
            amount: null, 
            measurement : null, 
            recipeNote: newIngredient
        }
        if (newIngredient && !ingredients.includes(newIngredient)) {
            setIngredients(prevIngredients => [...prevIngredients, newIng])
        }
        setNewIngredient('')
    }

    return (

        <form className="recipeform" onSubmit={handleSubmit}>

            <h2 id="recipeform-heading">New Recipe</h2>
            <div className="recipeform-section"></div>

            <div className="recipeform-section">
                <div className="recipeform-row">
                    <div className="row-with-span">
                        <label htmlFor="recipe-title" />
                        <span>New Title</span>
                        <input
                            type="text"
                            id="recipe-title"
                            name='title'
                            placeholder='Title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                </div>
                <div className="recipeform-time-container">
                    <div className="recipeform-row" id="recipeform-time-row">
                        <fieldset>
                            <legend>Prep time</legend>
                            <div className="time">
                                <label htmlFor="prep-time-hrs" />
                                <input
                                    type="number"
                                    id="prep-time-hrs"
                                    name="prepHrs"
                                    placeholder="Hrs"
                                    min={0}
                                    value={prepTime.prepHrs}
                                    onChange={handlePrepChange}
                                />
                            </div>
                            <div className="time">
                                <label htmlFor="prep-time-mins">
                                    <input
                                        type="number"
                                        id="prep-time-mins"
                                        name="prepMins"
                                        placeholder="Mins"
                                        min={0}
                                        value={prepTime.prepMins}
                                        onChange={handlePrepChange}
                                    />
                                </label>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Cook time</legend>
                            <div className="time">
                                <label htmlFor="cook-time-hrs">
                                    <input
                                        type="number"
                                        id='cook-time-hrs'
                                        name="cookHrs"
                                        placeholder="Hrs"
                                        min={0}
                                        value={cookTime.cookHrs}
                                        onChange={handleCookChange}
                                    />
                                </label>
                            </div>
                            <div className="time">
                                <label htmlFor="cook-time-mins">
                                    <input
                                        type="number"
                                        id='cook-time-mins'
                                        name="cookMins"
                                        placeholder="Mins"
                                        min={0}
                                        value={cookTime.cookMins}
                                        onChange={handleCookChange}
                                    />
                                </label>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="recipeform-section ingredient-section" >
                <div className="recipeform-row">
                    <div className="row-with-span">
                        <label htmlFor="recipe-ingredient" />
                        <span>Ingredient</span>
                        <input
                            type="text"
                            id="recipe-ingredient"
                            name='note'
                            placeholder='Ingredient'
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                        // ref={ingredientInput}
                        />
                        <button className="add-ingredient-btn" onClick={handleAdd}>+</button>
                    </div>
                </div>
                <div className="recipeform-row">
                    {ingredients && (
                        <div className="recipeform-ingredient-list">
                            {ingredientList}
                        </div>
                    )}
                </div>
            </div>

            <div className="recipeform-section">
                <div className="recipeform-row" id="recipeform-row-instructions">
                    <label htmlFor="instructions" />
                    <textarea
                        id="instructions"
                        name='instructions'
                        placeholder='Instructions'
                        rows={3}
                        onChange={(e) => setInstructions(e.target.value)}
                        value={instructions}
                    />
                </div>

                <div className="bottom-form-buttons">
                    <div id="btn-1">
                        <button class="med-btn" role="button" onClick={handleSubmit}>Add Recipe</button>
                    </div>
                    <div id="btn-2">
                        <Link to="/recipes">
                            <button class="med-btn" role="button">All Recipes</button>
                        </Link>
                    </div>
                </div>

            </div>

            <div className="recipeform-section">
                <p>sanity check:</p>
                <p>title - {title}</p>
                <p>new ingredient - {newIngredient}</p>
                <p>instructions - {instructions}</p>
            </div>

        </form>
    )
}

