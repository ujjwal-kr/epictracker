const compareHashes = {
    compareName: function(sha, response) {
        let present = false
        response.map(res => {
            if (res.name === sha) {
                present = true
            }
        })
        return present
    }
}

module.exports = compareHashes;