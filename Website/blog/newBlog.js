const marked = require("marked")

class BlogGenerator {
    constructor() {
        this.blogs = new Array();
    }
    
    createBlog(title, markdown) {
        const blog = `
<!DOCTYPE HTML>
<html>
<div class="blog-outline">
    <div class="blog-title">
        <h1>${title}</h1>
    </div>
    <div class="blog-content">
        ${marked.parse(markdown)}   </div> <!-- It auto makes a newline so the indent is the only thing that's needed -->
</div>
</html>
`
    return blog
    }
}

const markdown = `
### What is it? 
The plans for version 1.1 are to make the website a lot cleaner and add new pages to the website. We also plan to remove a few bugs and add a new couple commands/features. I plan on adding this blogs feature for updates ect...

## When will it be released?
I plan on releasing this version 1.1 before the new **Privileged Message Intents** are released. This may require me to verify the bot in the even that the bot reaches 100+ guilds. This may need me to deprecate a few features.

`

const generator = new BlogGenerator()
console.log(generator.createBlog("Version 1.1", markdown))