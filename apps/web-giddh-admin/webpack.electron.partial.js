const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "VERSION": JSON.stringify("4711"),
            'ENV': JSON.stringify('production'),
            'isElectron': JSON.stringify(false),
            'errlyticsNeeded': JSON.stringify(false),
            'errlyticsKey': JSON.stringify(''),
            'AppUrl': JSON.stringify('http://localhost:4200/'),
            'ApiUrl': JSON.stringify('https://apitest.giddh.com/'),
            'APP_FOLDER': JSON.stringify(''),
            'process.env.ENV': 'development',
            'process.env.NODE_ENV': 'development',
            'process.env.isElectron': JSON.stringify(false),
            'process.env.errlyticsNeeded': JSON.stringify(false),
            'process.env.errlyticsKey': JSON.stringify(''),
            'process.env.AppUrl': JSON.stringify('http://localhost:4200/'),
            'process.env.ApiUrl': JSON.stringify('https://apitest.giddh.com/'),
            'process.env.APP_FOLDER': JSON.stringify(''),
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
}
