var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const KAKAO_TOKEN_VERIFICATION_URL = "https://kapi.kakao.com/v2/user/me";
export const main = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_b = (_a = event === null || event === void 0 ? void 0 : event.request) === null || _a === void 0 ? void 0 : _a.validationData) === null || _b === void 0 ? void 0 : _b.accessToken;
    const result = yield axios.get(KAKAO_TOKEN_VERIFICATION_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(result);
    if (result.data.id) {
        callback(null, event);
    }
    else {
        const error = new Error("kakao authentication failed.");
        callback(error, event);
    }
});
//# sourceMappingURL=preKakaoAuthentication.js.map