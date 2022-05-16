// this module will be the list for of all existing games
// register new game button at the top that reroutes you to form

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "./GameManager.js"
import { Link } from "react-router-dom"

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
                        <div>
                            <Link className="nav_link" to={`/games/${game.id}`}>
                                {game.title}
                            </Link></div>
                    </section>
                })
            }
        </article>
    )
}