import i18n, {ModuleType} from 'i18next';
import {initReactI18next} from "react-i18next";
import * as RNLocalize from "react-native-localize";
import {getItem, setItem} from "../utils/asyncStorage";
import i18next from "i18next";

export const lngKey =  '@lng';

const languageDetector = {
    type: 'languageDetector' as ModuleType,
    async: true,
    detect: function (callback: any){
        // 获取上次使用的语言
        getItem(lngKey).then(lng => {
            // 如果是跟随本地那么就获取系统语言
            if (lng === 'locale')
                callback(getSystemLanguage());
            else
                callback(lng);
        })
    }
}


// 初始化 i18next 配置
i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'zh', // 切换语言失败时候使用的语言，如用户本地语言不是zh或者en就默认zh
        debug: false, // 开发环境开始调试
        resources: {
            en: {
                translation: require('./locales/en-US.json'),
            },
            zh: {
                translation: require('./locales/zh-CN.json'),
            },
        },
        react: {
            useSuspense: false,
        },
    })


/**
 * 获取当前系统语言
 * @returns
 */
export const getSystemLanguage = (): string => {
    const locales = RNLocalize.getLocales();
    return locales[0].languageCode;
};


/**
 * 切换语言
 * @param lng
 */
export const changeLanguage = async (lng?: 'en' | 'zh' | 'locale') => {
    // 切换语言
    await i18next.changeLanguage(lng === 'locale' ? getSystemLanguage() : lng);
    // 持久化当前选择
    await setItem(lngKey, lng as string);
};
