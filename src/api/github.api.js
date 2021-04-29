import axios from 'axios'

export const GithubApi = {
    getDataGithub,
    getRepository
}


// menampilkan akun info github
function getDataGithub(nama) {
    return axios.get(`https://api.github.com/users/${nama}`)
}


// menampilkan jumlah repository
function getRepository(nama) {
    return axios.get(`https://api.github.com/users/${nama}/repos`)
}





