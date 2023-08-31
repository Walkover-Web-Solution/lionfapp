const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "VERSION": JSON.stringify("4711"),
            'ENV': JSON.stringify('development'),
            'isElectron': JSON.stringify(false),
            'errlyticsNeeded': JSON.stringify(false),
            'errlyticsKey': JSON.stringify(''),
            'AppUrl': JSON.stringify('http://localhost:3000/'),
            'ApiUrl': JSON.stringify('https://routes.msg91.com/api/proxy/117230/18uykxj1/'),
            'APP_FOLDER': JSON.stringify(''),
            'process.env.ENV': 'development',
            'process.env.NODE_ENV': 'development',
            'process.env.isElectron': JSON.stringify(false),
            'process.env.errlyticsNeeded': JSON.stringify(false),
            'process.env.errlyticsKey': JSON.stringify(''),
            'process.env.AppUrl': JSON.stringify('http://localhost:3000/'),
            'process.env.ApiUrl': JSON.stringify('https://routes.msg91.com/api/proxy/117230/18uykxj1/'),
            'process.env.APP_FOLDER': JSON.stringify('')
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
}
