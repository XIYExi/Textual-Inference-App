# 主题系统

一个较为简陋的主题系统，使用mobx和useContext编写。

因为最开始编码的时候没有考虑到主题系统，所以在用户登录和注册的时候无法切换主题（默认为Light）

主题和i18n随用户信息存储在数据库中，当用户登录之后从后端取出数据存在mobx中，并且更新useContext，
content上下文的信息主要供公共组件```ThemeText```和```ThemeView```使用，ThemeText会识别上下文中的配置自动更新```color```属性，
ThemeView会识别配置自动更新```backgroundColor```属性。

将默认暴露出去的```<App/>```再用```<ThemeProvider/>```包裹一层，这样在App中就可以取得主题上下文，并且实时获取到当前theme数据，
当用户首次登录和修改配置之后，都会更新上下文吗，App组件识别到```theme.mode```修改之后就会更新```@react-navigation/native```中```<NavigationContainer />```
的主题色。


# i18n

国际化是通过```AsyncStorage```实现的，使用```react-i18next```实现多语言。

需要注意语言不需要跟随用户配置，直接存储在本地，原则上主题也也该存在AsyncStorage中，但是写的时候没反应过来，已经写死了！


