module.exports = client => {
    client.eventLog = async (before, after, embed) => {
        for([itemBefore, itemAfter] of [Object.entries(before), Object.entries(after)]) {
            if(itemBefore[1] != itemAfter[1]) { // Something changed if you make it past this check
                for([propertyBefore, propertyAfter] of [Oject.entries(itemBefore[1]), Object.entries(itemAfter[1])]) { // First item is the name of the property, second is the value
                    embed.addField(propertyBefore[0], `Before: ${propertyBefore[1]}\nAfter: ${propertyAfter[1]}`) // No clue if this will work for everything
                }
            }
        }
        return embed
    }
}