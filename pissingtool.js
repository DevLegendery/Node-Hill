//pissing tool by MixaMega, most of the code is "stolen" from SmartLion

//settings
namep = 'pissing tool'
color = "#f1ff2b"
pissalivetime = 4000 //how long you want the piss to stay alive for
modelid = 255357 //what model to use

let debug = -57.7

function btools(player) {

let create = new Tool(namep)
create.model = modelid
create.on("activated", p => {
var rotx = Math.round(p.position.x + 8 * Math.sin(p.rotation.z / debug))
var roty = Math.round(p.position.y - 8 * Math.cos(p.rotation.z / debug))
let brick = new Brick(new Vector3(rotx -= Math.round(p.brickSize /1.5) ,roty -= Math.round(p.brickSize /1.5) ,Math.round(p.position.z+p.brickplacement)),new Vector3(p.brickSize,p.brickSize,p.brickSize),p.brickcolor)
brick.name = "btools"
Game.newBrick(brick)
setTimeout(() => {
brick.destroy()
}, pissalivetime)
}, 500)

player.addTool(create)
}
Game.on("playerJoin", (player) => {
player.brickcolor = color
player.brickplacement = 0
player.brickSize = 1
player.on("initialSpawn", () => {
btools(player)
let brick = new Brick(new Vector3(0, 0, 0), new Vector3(3, 1, 3), color)
brick.setVisibility(0.5)
brick.setCollision(true)
Game.newBrick(brick)
brick.name = "buildingcore"
brick.setInterval(() => {
var rotx = Math.round(player.position.x + 8 * Math.sin(player.rotation.z / debug))
var roty = Math.round(player.position.y - 8 * Math.cos(player.rotation.z / debug))
brick.setColor(player.brickcolor)
brick.setPosition(new Vector3(rotx -= Math.round(brick.scale.x /1.5) ,roty -= Math.round(brick.scale.x /1.5),Math.round(player.position.z+player.brickplacement)))
brick.setScale(new Vector3(player.brickSize,player.brickSize,player.brickSize))
if (player.destroyed == true) {
brick.destroy()
}
}, 120)
})
})