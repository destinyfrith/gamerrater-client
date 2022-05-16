// this module is a form for creating games
// first version of the form should allow a user to only add one category 
// to a game by choosing a category option in a <select> element.
// When the the user fills out the form and clicks "Save", 
// redirect the user back to the game list view.
// need a getCategories fetch call

import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getCategories } from './GameManager.js'

export const GameForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])

    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        year_released: 2000,
        number_of_players: 0,
        time_to_play: 0,
        age_recommendation: 0,
        gamer: 0,
        categories: []
    })

    useEffect(() => {
        getCategories()
            .then(data => setCategories(data))
    }, [])

    const changeGameState = (evt) => {
        const newGame = Object.assign({}, currentGame)
        newGame[evt.target.name] = evt.target.value
        setCurrentGame(newGame)
    }

    return (
        <>
            <h3>Register New Game</h3>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" required autoFocus className="form-control"
                            value={currentGame.title}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description" required autoFocus className="form-control"
                            value={currentGame.description}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="maker">Designer: </label>
                        <input type="text" name="designer" required autoFocus className="form-control"
                            value={currentGame.designer}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="year_released">Year Released: </label>
                        <input id="year_released" type="number" name="year_released" required autoFocus className="form-control"
                            value={currentGame.year_released}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="number_of_players">Number Of Players: </label>
                        <input id="number_of_players" type="number" name="number_of_players" required autoFocus className="form-control"
                            value={currentGame.number_of_players}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="time_to_play">Estimated Time to Play in Minutes : </label>
                        <input id="time_to_play" type="number" name="time_to_play" required autoFocus className="form-control"
                            value={currentGame.time_to_play}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="age_recommendation">Age Recommendation: </label>
                        <input id="age_recommendation" type="number" name="age_recommendation" min="1" required autoFocus className="form-control"
                            value={currentGame.age_recommendation}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="categories">Category: </label>
                        <div className="control">
                            <select name="categories"
                                proptype="int"
                                value={currentGame.categories}
                                onChange={changeGameState}>
                                <option value="0">Select a Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        const game = {
                            title: currentGame.title,
                            description: currentGame.description,
                            designer: currentGame.designer,
                            year_released: parseInt(currentGame.year_released),
                            number_of_players: parseInt(currentGame.number_of_players),
                            time_to_play: currentGame.time_to_play,
                            age_recommendation: parseInt(currentGame.age_recommendation),
                            gamer: parseInt(localStorage.getItem("token")),
                            categories: parseInt(currentGame.categories)
                        }

                        createGame(game)
                            .then(() => history.push("/games"))
                    }}
                    className="btn btn-primary">Create</button>
            </form>
        </>
    )

}