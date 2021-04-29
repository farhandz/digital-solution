import React from 'react'

function ListRepo({repo}) {
    return (
        <>
            <div class="row">
        {repo.map((data , index) => {
            return (
              <div key={index} class="col-md-3 my-4 text-center">
                <div className="p-4 card-header">
                  <div>{data.name}</div>
                  <div className="font-weight-bold">{data.language}</div>
                  <div className="mt-3">
                      <div>Created At</div>
                    {new Date(data.created_at).getFullYear() +
                      "-" +
                      Number(new Date(data.created_at).getMonth() + 1) +
                      "-" +
                      new Date(data.created_at).getDay()}
                  </div>
                </div>
              </div>
            );
        })}
        </div>
        </>
    )
}

export default ListRepo
