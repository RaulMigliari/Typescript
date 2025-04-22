import * as _ from 'lodash';
let xwing = {
    name: "X-wing",
    pilot: "Luke Skywalker",
    speed: 50,
    weapons: 4
};
console.log(_.camelCase(xwing.pilot));
