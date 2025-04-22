interface User {
    id: number
    login: string
    name: string
    bio: string
    public_repos: number
    repos_url: string
}

interface Repo {
    name: string
    description: string
    fork: boolean
    stargazers_count: number
}

const users: User[] = []

function findUser(username: string) {
    const user = users.find(user => user.login === username)
    return user ?? false
}

async function getGitHubUser(username: string) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`)

        if(!response.ok) {
            throw new Error(`Usuário não encontrado ${username}`)
        }

        const user: User = await response.json()
        users.push(user)
        console.log(`Usuário ${username} adicionado com sucesso!`)

    } catch(err) {
        console.error(err.message)
    }
}

async function getRepoUser(username: string, repoName: string) {

    const user = findUser(username)
    if (user) {
        try{
            const response = await fetch(`https://api.github.com/users/${username}/repos`)

            if(!response.ok) {
                throw new Error(`Erro na requisição`)
            }

            const repos: Repo[] = await response.json()
            const foundRepo = repos.find(repo => repo.name === repoName)
            
            if(!foundRepo) {
                console.log(`Repositório ${repoName} não encontrado...`)
                return
            }

            const myRepo: Repo = {
                name: foundRepo.name,
                description: foundRepo.description,
                fork: foundRepo.fork,
                stargazers_count: foundRepo.stargazers_count
            }

            console.log(`Usuário: ${username}
                id: ${user.id}
                login: ${user.login}
                name: ${user.name}
                bio: ${user.bio}
                public_repos: ${user.public_repos}
                repos_url: ${user.repos_url}
                Repositório: ${myRepo.name}
                description: ${myRepo.description}
                fork: ${myRepo.fork}
                stargazers_count: ${myRepo.stargazers_count}`)

        } catch(err) {
            console.error(err)
        }
    } else {
        console.log('Usuário não encontrado!')
    }
}

function showAllUsers() {
    if(users.length === 0) {
        console.log('Nenhum usuário registrado ainda...')
        return
    }
    console.log('Lista de usuários:')
    users.forEach((user, index) => {
        console.log(`${index + 1 }. ${user.name || user.login}`)
    })
}

function sumReposUsers() {
    let sum = 0
    users.forEach(user => {
        sum += user.public_repos    
    })
    console.log(`A soma dos repositórios públicos de todos os usuários é: ${sum}`)
    return sum
}

function showTopFive() {
    const topFive = users.slice().sort((a,b) => b.public_repos - a.public_repos).slice(0,5)

    let message = 'Top 5 usuários com mais repositórios públicos:\n'
    topFive.forEach((user, index) => {
        message += `\n${index+1} - ${user.name || user.login}: ${user.public_repos} repositórios`
    })

    console.log(message)
}

async function main() {
    await getGitHubUser('isaacpontes')
    await getGitHubUser('RaulMigliari')
    await getGitHubUser('pcaldass')
    await getGitHubUser('lucasqueirogaa')
    await getGitHubUser('frans203')
    await getGitHubUser('LeDragoX')
  
    showAllUsers()
    sumReposUsers()
    showTopFive()
}
  
main()