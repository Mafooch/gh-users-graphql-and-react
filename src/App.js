import './App.css';
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_USERS = gql`
  {
    users {
      id
      login
      avatar_url
    }
  }
`

const User = ({ user: { login, avatar_url } }) => (
  <div>
    <div>
      <img alt='avatar' src={avatar_url} />
      <h1>{login}</h1>
    </div>
    <a href={`https://github.com/${login}`}>
      See Profile
    </a>
  </div>
)

function App() {
  const { loading, error, data } = useQuery(GET_USERS)
  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <main>
      <h1>Github | Users</h1>
      {data.users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </main>
  )
}

export default App;
