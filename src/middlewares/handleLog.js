const handleLog = async (req, res, next) => {
    console.log('La ruta consultada fue \n')
    console.log(req.url)
    console.log('El method \n')
    console.log(req.method)

    console.log('Con los query \n')
    console.table(req.query)

    next()
}

module.exports = {
    handleLog
}