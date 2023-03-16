const form = document.querySelector(".comments__form")
const formFields = {
    name: document.querySelector(".form__name"),
    text: document.querySelector(".form__text")
}
const commentList = document.querySelector(".comments__list")
const commentItem = document.querySelector(".comments__item")
commentItem.remove()
let comments = []

for (let key in formFields) {
    formFields[key].addEventListener("change", () => {
        formFields[key].parentNode.querySelector(".form__container_warn").classList.remove("active")
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const comment = {
        id: Date.now(),
        name: formData.get('name'),
        text: formData.get('text'),
        date: formData.get('date') || Date.now(),
    }
    if(formFields.name.value && formFields.text.value) {
        createComment(comment)
        e.target.reset()
    } else {
        for (let key in formFields) {
            if(!formFields[key].value) formFields[key].parentNode
                .querySelector(".form__container_warn")
                .classList.add("active")
        }
    }
})

const createComment = ({id, name, text, date}) => {
    let newComment = commentItem.cloneNode(true)
    const currentDate = new Date(Date.now())
    const formDate = new Date(date)
    const dayDiff = Math.round((Date.now() - formDate) / (1000 * 3600 * 24))
    const dateText = dayDiff === 0
        ? "сегодня"
        : dayDiff === 1
            ? "вчера"
            : `${formDate.getDate()}.${formDate.getMonth() + 1 < 10 ? "0" + (formDate.getMonth() + 1) : formDate.getMonth() + 1}.${formDate.getFullYear()}`
    console.log(dayDiff);
    newComment.querySelector(".comments__header_name").innerText = name
    newComment.querySelector(".comments__item_text").innerText = text
    newComment.querySelector(".comments__item_text").innerText = text
    newComment.querySelector(".comments__header_date").innerText = `${dateText}, ${currentDate.getHours()}:${currentDate.getMinutes()}`
    newComment.querySelector(".comments__nav_delete").addEventListener("click", () => {
        removeComment(id)
    })
    newComment.querySelector(".comments__nav_like").addEventListener("click", () => {
        newComment.querySelector(".comments__nav_like").classList.toggle("liked")
    })
    comments.push( {id: id, el: newComment} )
    comments.map(comment =>
        commentList.append(comment.el)
    )
}

const removeComment = (id) => {
    commentList.replaceChildren()
    comments = comments.filter(el => el.id !== id)
    comments.map(comment => {
        commentList.appendChild(comment.el)
    })
}
