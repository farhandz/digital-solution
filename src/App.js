import './App.css';
import { useState } from 'react';
import { GithubApi } from './api';
import { Gif } from './assets';
import Avatar from 'react-avatar'
import ListRepo from './components/ListRepo'


function App() {
  const [akun, SetAkun] = useState("")
  const [data, setData] = useState(null)
  const [loading , SetLoading] = useState(false);
  const [repo, setRepo] = useState(null)
  const HandleSubmit = (e) => {
    SetLoading(true)
    e.preventDefault()
    GithubApi.getDataGithub(akun).then(response => {
     setData(response.data)
     setRepo(null)
    }).catch(err => {
      setRepo(null)
      setData(err.response.data.message);
    }).finally(() => {
      SetLoading(false)
    })
  }

  const HandleClick = () => {
    GithubApi.getRepository(akun).then(response => {
      setRepo(response.data)
    }).catch((err) => {
      setRepo(err.response.data.message);
    })
  }
  return (
    <>
      <div className="wrapper-all container">
        <h3 className="text-secondary font-weight-bold text-center f-25 my-4">
          Cari Akun Github
        </h3>
        <form onSubmit={HandleSubmit}>
          <div className="form-group">
            <label>Akun Github</label>
            <input
              onChange={(e) => SetAkun(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Github Acount"
            />
          </div>
        </form>
        {/* kasih logic jika data masih terload */}
        {loading ? (
          <h5 className="text-center mt-4 font-weight-bold">Loading...</h5>
        ) : data === "Not Found" ? ( // kasih logic ketika data not found meenggunakan ternary operator
          <div className="text-center">
            <div className="font-weight-bold mt-4">Data Not Found</div>
            <Avatar size="170" src={Gif} round={true} />
          </div>
        ) : data === null ? (
          <p className="text-center">github.com</p>
        ) : (
          <div className="text-center mt-4 card-header p-5">
            <div>
              <Avatar size="100" src={data.avatar_url} round={true} />
              <div className="mt-2">{data.login}</div>
              <div className="mt-2">{data.location}</div>
              <div
                style={{ cursor: "pointer" }}
                className="text-primary mt-2"
                onClick={() => window.open(data.blog)}
              >
                {data.blog}
              </div>
              <h5 className="font-italic  mt-4">"{data.bio}"</h5>
              <div
                onClick={HandleClick}
                style={{ cursor: "pointer" }}
                className="my-4"
              >
                <div>Total Repository</div>
                <div>{data.public_repos}</div>
                <small className="text-danger">*Klik Total Repository Untuk Mendapatkan List Repository</small>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <div>
                  <div>Follower</div>
                  <div>{data.followers}</div>
                </div>
                <div className="ml-5">
                  <div>Following</div>
                  <div>{data.following}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {repo === null ? "" : <ListRepo repo={repo} />}
      </div>
    </>
  );
}

export default App;
