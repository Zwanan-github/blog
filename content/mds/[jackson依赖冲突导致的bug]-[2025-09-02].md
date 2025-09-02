> bug背景： 使用 mybatis-plus 保存 Json 类型的数据，开发环境正常，测试环境报错

```shell
org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'AxxxServiceImpl': Unsatisfied dependency expressed through field 'BxxxMapper'; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'BxxxMapper' defined in URL [xxxxxxx]: Invocation of init method failed; nested exception is java.lang.NoClassDefFoundError: com/fasterxml/jackson/core/JacksonException
```
### 问题所在

#### 查看 `maven` 中所有的 `jackson` 依赖包

> `mvn dependency:tree -Dverbose -Dincludes=*fasterxml*:*jackson*`

![2025-9-02-0001.png](/public/images/2025-9-02-0001.png)

对应了报错中的 `com.fasterxml.jackson.core.JacksonException` NoClassDefFoundError

![2025-9-02-0002.png](/public/images/2025-9-02-0002.png)

#### 但是 mybatis-plus 中依赖了 fasterxml.jackson.core

![2025-9-02-0003.png](/public/images/2025-9-02-0003.png)

依赖被前面 `eureka` 中的 `2.9.9` 覆盖了，导致找不到 `com.fasterxml.jackson.core.JacksonException`

### 解决

手动添加依赖以及版本

```xml
<!-- Jackson Core -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.17.2</version>
</dependency>

<!-- Jackson Databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.17.2</version>
</dependency>

<!-- Jackson Annotations -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.17.2</version>
</dependency>
```


