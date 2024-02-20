package com.linmoblog.server.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import java.util.Objects;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DatabaseInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        // 判断数据库中是否存在user表
        boolean userTableExists = checkUserTableExists();
        System.out.println(checkUserTableExists());
        if (!userTableExists) {
            // 执行db.sql文件中的SQL语句来创建user表
            executeDbSql();
        }else {
        }
    }

    private boolean checkUserTableExists() {
        // 判断数据库中是否存在user表的逻辑
        // 这里可以使用JdbcTemplate查询数据库元数据来判断表是否存在
        // 如果表存在，返回true；如果表不存在，返回false
        // 这里只是示例，实际判断逻辑需要根据数据库类型和具体情况来编写
        // 假设这里使用MySQL数据库，可以通过以下SQL语句来查询表是否存在：
        String sql = "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'linmoblog' AND table_name = 'user'";
        int count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count > 0;
    }

    private void executeDbSql() {
        // 执行db.sql文件中的SQL语句来创建user表的逻辑
        // 这里可以读取db.sql文件内容，并使用JdbcTemplate来执行SQL语句
        // 这里只是示例，实际逻辑需要根据具体情况来编写
        try {
            // 读取db.sql文件
            Resource resource = new ClassPathResource("db_init/db.sql");
            // 执行SQL语句
            ScriptUtils.executeSqlScript(Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection(), resource);
        } catch (Exception e) {
            e.printStackTrace();
            // 处理异常
        }
    }
}
