import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
let inputField = document.getElementById("input-field")
const tweetBtn = document.getElementById("tweet-btn")

tweetBtn.addEventListener('click', function() {
    if(inputField.value){
    tweetsData.unshift(
        {
            handle: `@meUser`,
            profilePic: `images/Profile-Male-PNG.png`,
            likes: 0,
            retweets: 0,
            tweetText: inputField.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        }
    )
    render()
    inputField.value = ''
}
})

document.addEventListener('click', function(e){
    if (e.target.dataset.likes) {
        handleLikes(e.target.dataset.likes)
    } 
    else if (e.target.dataset.retweets) {
        handleRetweets(e.target.dataset.retweets)
    }
    else if(e.target.dataset.comments) {
        handleReplyClick(e.target.dataset.comments)
    }
})


function handleLikes(tweetId) {
    const targetTweet = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if (targetTweet.isLiked) {
        targetTweet.likes--
    } else {
        targetTweet.likes++
    }
    targetTweet.isLiked = !targetTweet.isLiked
    render()
}
function handleRetweets(tweetId) {
    const targetTweet = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if(targetTweet.isRetweeted) {
        targetTweet.retweets--
    } else {
        targetTweet.retweets++
    }
    targetTweet.isRetweeted = !targetTweet.isRetweeted
    render()
}
function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}



function renderArray() {
    let feedHTML = ''

tweetsData.forEach(function(obj) {
    let retweetClass = ''
    let heartClass = ''

    if(obj.isLiked) {
        heartClass = 'liked'
    }
    if(obj.isRetweeted) {
        retweetClass = 'retweeted'
    }

    let repliesHtml = ''

    if(obj.replies.length > 0) {
        obj.replies.forEach(function(replyObj){
            repliesHtml += 
`<div class="tweet-reply">
    <div class="object-render">
        <img src="${obj.profilePic}" class="profile-pic">
            <div class="object">
                <p class="handle">${replyObj.handle}</p>
                <p class="tweet-text">${replyObj.tweetText}</p>
            </div>
        </div>
</div>
`})
}

    feedHTML +=
`<div class="object-render">
    <img src="${obj.profilePic}" alt="profile picture">
    <div class="object">
        <p class="handle">${obj.handle}</p>
        <p class="tweet-text">${obj.tweetText}</p>
        <div class="reactions">
        <div>
        <i class="fa-sharp fa-regular fa-comment-dots" data-comments="${obj.uuid}"></i>${obj.replies.length}
        </div>
        <div>
        <i class="fa-solid fa-heart ${heartClass}" data-likes="${obj.uuid}"></i>${obj.likes}
        </div>
        <div>
        <i class="fa-solid fa-retweet ${retweetClass}"data-retweets="${obj.uuid}"></i>${obj.retweets}
        </div>
        </div>
        <div class="hidden" id="replies-${obj.uuid}">
        ${repliesHtml}
        </div>
    </div>
</div>`
})
return feedHTML
}
function render() {
    document.getElementById('tweets-field').innerHTML = renderArray()
}

render()



