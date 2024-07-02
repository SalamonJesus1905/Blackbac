const errorHandler = (error:any, req:any, res:any, next:any) => {
        error.statusCode = error.statusCode || 500
        error.message = error.message || 'something went wrong'
        res.status(error.statusCode).json({ message: error.message, status: error.statusCode })
}

export default errorHandler;