import './App.css';
import { useState } from 'react';
import { GithubApi } from './api';
import { Gif } from './assets';
import Avatar from 'react-avatar'


function App() {
  const [akun, SetAkun] = useState("")
  const [data, setData] = useState(null)
  const [loading , SetLoading] = useState(false);
  const HandleSubmit = (e) => {
    SetLoading(true)
    e.preventDefault()
    GithubApi.getDataGithub(akun).then(response => {
     setData(response.data)
    }).catch(err => {
      setData(err.response.data.message);
    }).finally(() => {
      SetLoading(false)
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
        ) : data === "Not Found" ? (  // kasih logic ketika data not found meenggunakan ternary operator
          <div className="text-center">
            <div className="font-weight-bold mt-4">Data Not Found</div>
            <Avatar size="170" src={Gif} round={true} />
          </div>
        ) : data === null ? (
          <p className="text-center">github.com</p>
        ) : (
          <div className="text-center mt-4 card-header">
            <div>
              <Avatar size="100" src={data.avatar_url} round={true} />
              <div className="mt-1">{data.login}</div>
              <h5 className="font-italic  mt-1">{data.bio}</h5>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
