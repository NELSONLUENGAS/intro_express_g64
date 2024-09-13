const handleGenerateHATEOAS = (data) => {
    return {

        count: data.rowCount,
        results: data.rows,
        pages: data.pages,
        next: `http://localhost:5000/${data.type}?limit=${data.limit}&offset=${data.offset}`

    }

}

module.exports = {
    handleGenerateHATEOAS
}