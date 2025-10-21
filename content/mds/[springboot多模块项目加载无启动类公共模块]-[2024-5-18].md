![](/public/images/2024-5-18-0001.png)

在多模块的项目开发中，通常把可以复用的代码提取到 `common` 模块中，但是加载 `common` 中的 `Bean` 需要有启动类。那么就可以使用 `spring` 自带的基于SPI机制的配置文件 `spring.fatories` 来配置 `common` 中需要注册的 `Bean` 。引入了 `common` 模块依赖的项目在构建的时候会自动导入配置的 `Bean`。

## 在common模块创建spring.factories

> 一定要在 META-INF 中创建，没有 META-INF 就创建一个

![](/public/images/2024-5-18-0002.png)

## 引入要注册的 Bean

![](/public/images/2024-5-18-0003.png)
