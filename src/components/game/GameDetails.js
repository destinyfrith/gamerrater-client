// shows the details of the games
// title, designer, year released, number of players, time to play, age, categories
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGame, getCategories } from "./GameManager"

export const GameDetails = () => {
    const { gameId } = useParams()

    const [currentGame, setGame] = useState()
    const [category, setCategories] = useState()

    useEffect(() => {
        getGame(gameId)
            .then(data => setGame(data))
    }, [])


    return (
        <>
            <h1>Game Details</h1>
            <h3>{currentGame.title}</h3>
            <ul>
                <li>Description: {currentGame.description}</li>
                <li>Made By: {currentGame.designer}</li>
                <li>Released in: {currentGame.year_released}</li>
                <li>Number of Players: {currentGame.number_of_players}</li>
                <li>Estimated time to play: {currentGame.time_to_play}</li>
                <li>Age Recommendation: {currentGame.age_recommendation}+</li>
                <li>Category: {currentGame.categories.map(category => { category.name })}</li>
            </ul>

        </>
    )
}
