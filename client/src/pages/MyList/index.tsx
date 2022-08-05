import { CircularProgress } from '@mui/material'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getWatchListDetails } from '../../api/myListApi'
import MovieCard from '../../components/MovieCard'
import { Movie } from '../../interface'

const MyListPage = () => {
  const [movies, setMovies] = React.useState<Movie[]>([])
  const fetchData = async () => {
    try {
      const data = await getWatchListDetails();
      setMovies(data.watchList)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="movie-grid-container">
      <div className='movie-grid__title'>My List</div>
      <InfiniteScroll
        next={fetchData}
        hasMore={false}
        loader={
          <div className="circle-loading">
            <CircularProgress />
          </div>
        }
        dataLength={movies?.length || 0}
      >
        <div className="movie-grid">
          {movies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default MyListPage