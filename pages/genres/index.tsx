import Link from "next/link"
import { read } from "../../lib/neo4j"

// pages/genres/index.jsx
export async function getStaticProps() {
    const res = await read(`
        MATCH (m:Movie)
        RETURN m {
            id: toString(ID(m)),
            title: m.title,
            tagline: m.tagline,
            released: toString(m.released)
        } AS movies 
    `)
    const movies = res.map(row => row.movies)
  
    return {
      props: {
        movies,
      }
    }
}

type Movie = {
    id: string,
    title: string,
    tagline: string,
    released: string
}

export default function GenresList(props: { movies: Movie[] }) {
    return (
      <div>
        <h1>Movies</h1>
  
        <ul>
          {props.movies.map(movie => <li key={movie.title}>
            <Link href={`/genres/${movie.id}`}>{movie.title}-{movie.tagline} ({movie.released})</Link>
          </li>)}
        </ul>
      </div>
    )
}
