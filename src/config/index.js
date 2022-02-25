const convict = require('convict');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
const env = process.env.NODE_ENV;
const envFile = env === 'test' ? '.env.test' : '.env';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const config = convict({
    /**
     * Server config
     */
    host: {
        doc: 'Server host name / IP',
        format: '*',
        default: '0.0.0.0',
    },
    port: {
        doc: 'Server port',
        format: 'port',
        env: 'PORT',
        default: 8080,
    },
    proxy: {
        doc: 'Server proxy',
        format: 'url',
        env: 'HTTP_PROXY',
        default: undefined,
    },

    /**
     * Application config
     */
    env: {
        doc: 'Application environment',
        format: ['development', 'test', 'production'],
        env: 'NODE_ENV',
        default: 'development',
    },
    logsDir: {
        doc: 'Application logs directory',
        format: String,
        default: `${__dirname}/../../logs`,
    },

    /**
     * JWT config
     */
    jwtConfig: {
        algorithm: {
            doc: 'JWT algorithm',
            format: String,
            default: 'HS256',
        },
        secret: {
            doc: 'JWT secret',
            format: String,
            env: 'JWT_SECRET',
            default: null,
        },
        accessTokenExpiryTime: {
            doc: 'Access token expiry time (in seconds)',
            format: 'int',
            default: 14400,
        },
        refreshTokenExpiryTime: {
            doc: 'Refresh token expiry time (in seconds)',
            format: 'int',
            default: 14400,
        },
    },

    /**
     * SMTP config
     */
    SMTP: {
        host: {
            host: 'smtp.gmail.com',
            port: 587,
            user: 'jocampo66784@umanizales.edu.co',
            pass: '0c4mp08500.',
        },
    },
});

// Validate current config
config.validate({ allowed: 'strict' });

module.exports = {
    // Export plain config object
    ...config.getProperties(),

    // Export config related aliases
    isTest: env === 'test',
    isProduction: env === 'production',
    db: process.env.MONGODB_URI ||
        'mongodb://encuestas:3ncu3st4s2021@cluster0-shard-00-00.aoblf.mongodb.net:27017,cluster0-shard-00-01.aoblf.mongodb.net:27017,cluster0-shard-00-02.aoblf.mongodb.net:27017/encuestas?ssl=true&replicaSet=atlas-12sqkc-shard-0&authSource=admin&retryWrites=true&w=majority'
};