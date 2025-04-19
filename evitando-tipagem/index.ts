//! Usando o operador '?'

function sendSpaceship(spaceship: {pilot: string, copilot?: string}) {
    // ...
}

sendSpaceship({ pilot: 'Han Solo', copilot: 'Chewbacca' })
sendSpaceship({pilot: 'Luke'})

//! Usando o tipo 'unknown'
let input: unknown
let text: string

input = 'Teste'
// text = input => Erro

//! Usando o tipo 'any'
let input1: any
let text1: string

input1 = 'Teste'
text1 = input1

//! Tipo 'never' => impede que qualquer valor seja atribuído a uma variável

let _check: never

// check = 1 => Erro, não pode atribuir valor