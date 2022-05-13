// this module will be the list for of all existing games
// register new game button at the top that reroutes you to form

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    // initial setting of state for games
    const gamesState = () => {
        getGames()
            .then((data) => {
                setGames(data)
            })
    }

    // this useeffect fetches the current state of all games (list)
    useEffect(() => {
        gamesState()
    }, [])


    return (
        <article className="games">
            <button className="btn btn-1"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title}</div>
                        <div className="game__designer">Designer is {game.designer}</div>
                        <div className="game__year">Released in {game.year_released}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__time">This game takes {game.time_to_play}</div>
                        <div className="game__age">Recommended age minimum: {game.year_released}</div>
                        <div className="game__categories">Catgories: {game.category}</div>
                    </section>
                })
            }
        </article>
    )
}