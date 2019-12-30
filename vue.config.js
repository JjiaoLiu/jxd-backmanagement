module.exports = {
    devServer: {
        proxy: {
            '/admin': {
                target: "http://192.168.0.100:8080/admin",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/admin": ''
                }
            },
            '/oauth': {
                target: "http://192.168.0.100:8080/oauth",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/oauth": ''
                }
            }
        }
    }
};