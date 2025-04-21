type Planet = "Mercúrio" | "Vênus" | "Terra" | "Marte" | "Júpiter" | "Saturno" | "Urano" | "Netuno" | "Plutão"

let planet: Planet
let homePlanet: Planet

function checkPlanet(planet: Planet) {
    if (planet === "Terra") {
        console.log()
    }
}

type GreetingCallBack = (name: string) => void

function greet(callback: GreetingCallBack) {
    const name = prompt("Qual seu nome?")
    
    callback(name) // Repare que se o valor não fosse uma string, ele não poderia ser passado como parâmetro
}

// E ao definir nosso callback temos acesso às informações sobre o seu tipo e 
// retorno para nos auxiliar

greet((name) => {
    alert(`Olá, ${name}! Essa é uma saudação executada como callback!`)
})