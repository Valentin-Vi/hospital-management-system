var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AuthController_instances, _AuthController_ACCESS_JWT_MAX_AGE, _AuthController_REFRESH_JWT_MAX_AGE, _AuthController_access_jwt_secret, _AuthController_refresh_jwt_secret, _AuthController_access_jwt_life, _AuthController_refresh_jwt_life, _AuthController_verifyCookie, _AuthController_generateAccessTokens, _AuthController_generateRefreshToken, _AuthController_clearAuthCookies;
import { AuthService } from "@auth";
import { SignupInfoSchema } from "@auth/schemas";
import { LoginInfoSchema } from "@auth/schemas";
import { RefreshTokenSchema } from "@auth/schemas";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { hashSync } from "bcrypt";
class AuthController {
    constructor() {
        _AuthController_instances.add(this);
        _AuthController_ACCESS_JWT_MAX_AGE.set(this, 3600000); // 1 hour in miliseconds (1000 * 60 * 60)
        _AuthController_REFRESH_JWT_MAX_AGE.set(this, 2592000000); // 30 days in miliseconds (1000 * 60 * 60 * 14 * 30)
        _AuthController_access_jwt_secret.set(this, void 0);
        _AuthController_refresh_jwt_secret.set(this, void 0);
        _AuthController_access_jwt_life.set(this, void 0);
        _AuthController_refresh_jwt_life.set(this, void 0);
        this.service = new AuthService();
        // Bind methods
        this.signup = this.signup.bind(this);
        let access_jwt_secret = process.env.ACCESS_JWT_SECRET;
        let refresh_jwt_secret = process.env.ACCESS_JWT_SECRET;
        let access_jwt_life = process.env.ACCESS_JWT_LIFE;
        let refresh_jwt_life = process.env.REFRESH_JWT_LIFE;
        if (access_jwt_secret === undefined) {
            throw new Error('ACCESS_JASONWEBTOKEN_SECRET value not defined in `.env` file.');
        }
        if (refresh_jwt_secret === undefined) {
            throw new Error('REFRESH_JWT_SECRET value not defined in `.env` file.');
        }
        __classPrivateFieldSet(this, _AuthController_access_jwt_secret, access_jwt_secret, "f");
        __classPrivateFieldSet(this, _AuthController_refresh_jwt_secret, refresh_jwt_secret, "f");
        if (access_jwt_life === undefined) {
            throw new Error('ACCESS_JWT_LIFE numerical value not defined in .env file.');
        }
        if (refresh_jwt_life === undefined) {
            throw new Error('REFRESH_JWT_LIFE numerical value not defined in .env file.');
        }
        __classPrivateFieldSet(this, _AuthController_access_jwt_life, parseInt(access_jwt_life), "f");
        __classPrivateFieldSet(this, _AuthController_refresh_jwt_life, parseInt(refresh_jwt_life), "f");
        return this;
    }
    signup(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signupInfo = request.body;
                const parseResult = SignupInfoSchema.safeParse(signupInfo);
                if (parseResult.success === false) {
                    return response.status(400).send({
                        message: 'signupInfo is malformed or not present.'
                    });
                }
                const userInfo = parseResult.data;
                userInfo.password = hashSync(userInfo.password, 10);
                const signedUser = yield this.service.signup(userInfo);
                if (signedUser.success) {
                    return response.status(200).send({
                        message: 'Signup successful.'
                    });
                }
                else {
                    return response.status(400).send({
                        message: 'Email already exists.'
                    });
                }
            }
            catch (err) {
                console.error(err);
                return response.status(500).send({
                    message: 'Internal server error.'
                });
            }
            ;
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginInfo = request.body;
                if (LoginInfoSchema.safeParse(loginInfo).success === false) {
                    return response.status(400).send({
                        message: 'loginInfo is malformed or not present.'
                    });
                }
                const loginResult = yield this.service.login(loginInfo);
                if (loginResult.success === false)
                    return response.status(400).send({
                        message: loginResult.error
                    });
                const user = loginResult.data;
                const accessToken = __classPrivateFieldGet(this, _AuthController_instances, "m", _AuthController_generateAccessTokens).call(this, user.userId);
                const refreshToken = __classPrivateFieldGet(this, _AuthController_instances, "m", _AuthController_generateRefreshToken).call(this, {
                    userId: user.userId,
                    email: user.email,
                    password: user.password
                });
                response.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: __classPrivateFieldGet(this, _AuthController_ACCESS_JWT_MAX_AGE, "f")
                });
                response.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: __classPrivateFieldGet(this, _AuthController_REFRESH_JWT_MAX_AGE, "f")
                });
                return response.status(200).send({
                    message: 'LogIn successful.'
                });
            }
            catch (err) {
                console.error(err);
                return response.status(500).send({
                    message: 'Internal server error.'
                });
            }
        });
    }
    refresh(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = request.cookies.refresh_token;
                const verifyResult = __classPrivateFieldGet(this, _AuthController_instances, "m", _AuthController_verifyCookie).call(this, refreshToken);
                if (verifyResult.success === false) {
                    __classPrivateFieldGet(this, _AuthController_instances, "m", _AuthController_clearAuthCookies).call(this, response);
                    return response.status(400).send({
                        message: verifyResult.error
                    });
                }
                const { email, password } = verifyResult.data;
                const loginResult = yield this.service.login({ email, password });
                if (loginResult.success === false) {
                    __classPrivateFieldGet(this, _AuthController_instances, "m", _AuthController_clearAuthCookies).call(this, response);
                    return response.status(400).send({
                        message: loginResult.error
                    });
                }
                const accessToken = __classPrivateFieldGet(this, _AuthController_instances, "m", _AuthController_generateAccessTokens).call(this, loginResult.data.userId);
                response.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: __classPrivateFieldGet(this, _AuthController_ACCESS_JWT_MAX_AGE, "f")
                });
                return response.status(200).send({
                    message: "accessToken cookie refreshed successfully."
                });
            }
            catch (err) {
                console.error(err);
                return response.status(500).send({
                    message: 'Internal server error.'
                });
            }
        });
    }
    logout(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                __classPrivateFieldGet(this, _AuthController_instances, "m", _AuthController_clearAuthCookies).call(this, response);
                return response.status(200).send({
                    message: "Logged out Successfully."
                });
            }
            catch (err) {
                console.error(err);
                return response.status(500).send({
                    message: "Internal server error."
                });
            }
        });
    }
}
_AuthController_ACCESS_JWT_MAX_AGE = new WeakMap(), _AuthController_REFRESH_JWT_MAX_AGE = new WeakMap(), _AuthController_access_jwt_secret = new WeakMap(), _AuthController_refresh_jwt_secret = new WeakMap(), _AuthController_access_jwt_life = new WeakMap(), _AuthController_refresh_jwt_life = new WeakMap(), _AuthController_instances = new WeakSet(), _AuthController_verifyCookie = function _AuthController_verifyCookie(refreshToken) {
    try {
        const decoded = jwt.verify(refreshToken, __classPrivateFieldGet(this, _AuthController_refresh_jwt_secret, "f"));
        RefreshTokenSchema.parse(decoded);
        return {
            success: true,
            data: decoded
        };
    }
    catch (err) {
        if (err instanceof TokenExpiredError) {
            return {
                success: false,
                error: 'TokenExpiredError: jwt expired'
            };
        }
        else if (err instanceof JsonWebTokenError) {
            return {
                success: false,
                error: "JsonWebTokenError: invalid signature"
            };
        }
        else {
            return {
                success: false,
                error: 'Unknown error during cookie verification.'
            };
        }
    }
}, _AuthController_generateAccessTokens = function _AuthController_generateAccessTokens(userId) {
    return jwt.sign({ userId: userId }, __classPrivateFieldGet(this, _AuthController_access_jwt_secret, "f"), { expiresIn: __classPrivateFieldGet(this, _AuthController_access_jwt_life, "f") });
}, _AuthController_generateRefreshToken = function _AuthController_generateRefreshToken(userInfo) {
    return jwt.sign({ userInfo: userInfo }, __classPrivateFieldGet(this, _AuthController_refresh_jwt_secret, "f"), { expiresIn: __classPrivateFieldGet(this, _AuthController_refresh_jwt_life, "f") });
}, _AuthController_clearAuthCookies = function _AuthController_clearAuthCookies(response) {
    response.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'none',
    });
    response.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: 'none',
    });
};
;
export default AuthController;
