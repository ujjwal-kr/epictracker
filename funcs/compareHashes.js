const compareHashes = {
    compareName: function(sha, response) {
        response.map(res => {
            if (res.name === sha) {
                return true
            }
        })
        return false
    }
}