var _ = require("lodash")
const dummy = (blogs) => {
    return 1
}
const likes = (blogs) => {
    const sum= blogs.reduce((initialSum, blog) => initialSum+Number(blog.likes), 0)
    return sum

}
const favoriteBlog = (blogs) => {
    let mostLiked
    let maxLikes=0
    for(let blog of blogs)
    {
        if(blog.likes>maxLikes){
            maxLikes=blog.likes
            mostLiked = blog
        }
    }
    return mostLiked
}
const mostBlog = (blogs) => {



}
module.exports={ dummy,likes, favoriteBlog }