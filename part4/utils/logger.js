
const info = (...params) => {
    console.log(...params)
}
const error = (...params) => {

    console.error(...params)
}
const log = (...params) => {

    console.log(...params)
}
module.exports = { info, error, log }