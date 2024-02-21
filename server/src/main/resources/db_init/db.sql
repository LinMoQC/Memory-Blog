# 数据表生成
create table categories
(
    category_key   int unsigned auto_increment comment '唯一标识'
        primary key,
    category_title varchar(10)            not null comment '分类名',
    introduce      varchar(100)           not null comment '分类介绍',
    icon           varchar(20)            not null comment 'icon',
    note_count     int     default 0      not null comment '该类文章',
    color          char(8) default '#fff' not null comment '颜色',
    constraint categorie_title
        unique (category_title)
)
    comment '分类表';

create table friends
(
    friend_key  int unsigned auto_increment comment '唯一标识'
        primary key,
    site_name   varchar(20)   not null comment '网站名称',
    avatar      varchar(300)  not null comment '头像',
    site_url    varchar(50)   not null comment '友链',
    description varchar(50)   null comment '自我描述',
    status      int default 0 not null comment '友链状态',
    constraint friends_site_name_uindex
        unique (site_name),
    constraint friends_site_url_uindex
        unique (site_url)
)
    comment '友链表';

create table images
(
    image_key int unsigned auto_increment comment '唯一标识'
        primary key,
    image_url varchar(300) not null comment '图片链接'
)
    comment '图库表';

create table notes
(
    note_key      int unsigned auto_increment comment '唯一标识'
        primary key,
    note_title    varchar(50)                  not null comment '文章标题',
    note_content  text                         not null comment '内容',
    description   text                         not null comment '文章描述',
    cover         varchar(300)                 not null comment '封面',
    note_category varchar(10)                  not null comment '文章分类',
    note_tags     varchar(50)                  null comment '文章标签',
    status        varchar(10) default 'public' not null comment '发布状态',
    create_time   datetime                     not null comment '发布时间',
    update_time   datetime                     null,
    is_top        int         default 0        null,
    constraint title
        unique (note_title),
    constraint notes_ibfk_1
        foreign key (note_category) references categories (category_title)
)
    comment '文章表';

create index categories_title
    on notes (note_category);

create table tag_level_1
(
    tag_key int unsigned auto_increment comment '唯一标识'
        primary key,
    title   varchar(20)               not null comment '标签名称',
    level   int     default 2         not null comment '一级标签',
    color   char(8) default '#ffffff' not null comment '标签颜色',
    constraint title
        unique (title)
)
    comment '一级级标签表';

create table tag_level_2
(
    tag_key    int unsigned              not null comment '唯一标识'
        primary key,
    title      varchar(20)               not null comment '标签名称',
    level      int     default 2         not null comment '二级标签',
    color      char(8) default '#ffffff' not null comment '标签颜色',
    father_tag varchar(20)               not null comment '父标签',
    constraint title
        unique (title),
    constraint fk_father_key
        foreign key (father_tag) references tag_level_1 (title)
            on update cascade on delete cascade
)
    comment '二级标签表';

create table talks
(
    talk_key    int unsigned auto_increment comment '唯一标识'
        primary key,
    talk_title  varchar(50) not null comment '说说标题',
    content     text        not null comment '说说内容',
    create_time datetime    not null comment '创建时间',
    update_time datetime    null comment '更新时间'
)
    comment '说说表';

create table user
(
    username varchar(100) not null comment '账号',
    password varchar(100) not null comment '密码',
    avatar   varchar(255) not null comment '头像url',
    talk     text         null comment '一言',
    name     varchar(10)  not null,
    constraint password
        unique (password),
    constraint user_name_uindex
        unique (name),
    constraint username
        unique (username)
)
    comment '用户';

# admin 123456
insert into user (username, password) values ('8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
                                              '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');

# 触发器
CREATE TRIGGER update_category_article_count
    AFTER INSERT ON notes
    FOR EACH ROW
BEGIN
    -- 更新相应分类的文章数量
    UPDATE categories
    SET note_count = note_count + 1
    WHERE category_title = NEW.note_category; -- 使用NEW关键字引用插入的新行的值
END;

CREATE TRIGGER decrease_category_article_count
    AFTER DELETE ON notes
    FOR EACH ROW
BEGIN
    -- 减少相应分类的文章数量
    UPDATE categories
    SET note_count = note_count - 1
    WHERE category_title = OLD.note_category; -- 使用OLD关键字引用删除的行的值
END;

CREATE TRIGGER update_note_category_article_count
    AFTER UPDATE ON notes
    FOR EACH ROW
BEGIN
    -- 原分类文章数量减一
    UPDATE categories
    SET note_count = note_count - 1
    WHERE category_title = OLD.note_category; -- 使用OLD关键字引用旧的分类

    -- 新分类文章数量加一
    UPDATE categories
    SET note_count = note_count + 1
    WHERE category_title = NEW.note_category; -- 使用NEW关键字引用新的分类
END;
