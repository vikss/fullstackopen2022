const dummy = (blogs) => {
    return 1
}
const likes = (blogs) => {
    const sum= blogs.reduce((initialSum, blog) => initialSum+Number(blog.likes), 0)
    console.log(sum)
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
module.exports={ dummy,likes, favoriteBlog }